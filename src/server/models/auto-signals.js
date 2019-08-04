const fetch = require('node-fetch');
const { ObjectId } = require('mongodb');
const { mongoconnection } = require('../config/mongoconnection');

let alertSignalInterval = [];

// function createAutoSignals() {
//     const SMA_ARRAY = ['https://www.alphavantage.co/query?function=SMA&symbol=USDEUR&interval=5min&time_period=10&series_type=open&apikey=IFRN6HIL90MFHQP4',
//     'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=IFRN6HIL90MFHQP4'
//     ];

//     setInterval(() => {
//         Promise.all(SMA_ARRAY.map(url =>
//             fetch(url).then(resp => resp.json())
//         )).then(json => {
//             const smavalue = json[0];
//             const curentSma = smavalue['Technical Analysis: SMA'][Object.keys(smavalue['Technical Analysis: SMA'])[0]]['SMA'];
//             const liveCurrencyRate = json[1]['Realtime Currency Exchange Rate']['5. Exchange Rate'];
//             if (parseFloat(curentSma) < parseFloat(liveCurrencyRate)) {
//                 transporter.sendMail(generateMailPasswords({ alertType: 'BUY', smaValue: curentSma, currentValue: liveCurrencyRate, graphDirection: 'up' }), function(error, info){
//                     if (error) {
//                       console.log(error);
//                     } else {
//                       console.log('Email sent: ' + info.response);
//                     }
//                   });
//             } else {
//                 transporter.sendMail(generateMailPasswords({ alertType: 'SELL', smaValue: curentSma, currentValue: liveCurrencyRate, graphDirection: 'down'  }), function(error, info){
//                     if (error) {
//                       console.log(error);
//                     } else {
//                       console.log('Email sent: ' + info.response);
//                     }
//                   });
//             }
//         })
//     }, 1000 * 60 * 5);
// }

function createRSISignal(signalData) {
    const { currencyPair, timeFrame, indicatorParameters, ohlc, signalTimeFrame, indicator, alert_id, email } = signalData;
    const { level, period } = indicatorParameters;
    const { timeOut } = signalTimeFrame;

    console.log('rsi indicator alert created with id', alert_id);

    alertSignalInterval[alert_id] = setInterval(() => {
        fetch(`https://www.alphavantage.co/query?function=RSI&symbol=${currencyPair}&interval=${timeFrame}&time_period=${parseInt(period)}&series_type=${ohlc}&apikey=JJJLU0RT9LACJCYK`)
            .then(res => res.json())
            .then(json => {
                const rsi_analysis_keys = Object.keys(json["Technical Analysis: RSI"]);
                const rsi_analysis = json["Technical Analysis: RSI"];
                const rsi = parseFloat(rsi_analysis[rsi_analysis_keys[0]]["RSI"]);
                let alert = {
                    currencyPair,
                    indicator: indicator.toUpperCase(),
                    created_at: new Date()
                };

                if (rsi > parseFloat(level)) {
                    alert = {
                        ...alert,
                        sellPrice: rsi,
                        buyPrice: '',
                    };
                } else if (rsi <= 30) {
                    alert = {
                        ...alert,
                        sellPrice: '',
                        buyPrice: rsi,
                    };
                }
                mongoconnection.dbInstance((db) => {
                    const database = db.db('signalant');
                    database.collection('alerts').insert({ ...alert, email }, (err, result) => {
                        if (err) console.log(err);
                        console.log('alert created');
                    })
                });
            })
    }, parseInt(timeOut) * 1000);
    // if RSI crosses signal threshold generate sell signal or if it is less than 30 generate buy signal
}


function createBollingerBands(signalData) {
    const { currencyPair, timeFrame, indicatorParameters, ohlc, signalTimeFrame, alert_id, email } = signalData;
    const { deviation, period } = indicatorParameters;
    const { timeOut } = signalTimeFrame;
    console.log('bollinger bands indicator alert created with id', alert_id);
    alertSignalInterval[alert_id] = setInterval(() => {
        fetch(`https://www.alphavantage.co/query?function=BBANDS&symbol=${currencyPair}&interval=${timeFrame}&time_period=${parseInt(period)}&series_type=${ohlc}&nbdevup=${parseInt(deviation)}&nbdevdn=${parseInt(deviation)}&apikey=JJJLU0RT9LACJCYK`)
            .then(res => res.json())
            .then(json => {
                const bb_analysis_keys = Object.keys(json["Technical Analysis: BBANDS"]);
                const bb_analysis = json["Technical Analysis: BBANDS"][bb_analysis_keys[0]];
                const fromSymbol = currencyPair.split('').splice(0, 3).join('');
                const toSymbol = currencyPair.split('').splice(3).join('');
                const currency_key = ohlc.contains('close') ? '4. close' : '1. open';

                fetch(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&apikey=JJJLU0RT9LACJCYK`)
                    .then(res => res.json())
                    .then(response => {
                        const current_price_keys = Object.keys(response['Time Series FX (Daily)']);
                        const recent_currency_ex = parseFloat(response['Time Series FX (Daily)'][current_price_keys[0]][currency_key]);
                        const bb_analysis_lower_band = parseFloat(bb_analysis['Real Lower Band']);
                        const bb_analysis_higher_band = parseFloat(bb_analysis['Real Upper Band']);
                        
                        if ((bb_analysis_higher_band - recent_currency_ex) < (recent_currency_ex - bb_analysis_lower_band)) {
                            console.log('buy signal');
                        } else {
                            console.log('sell signal');
                        }
                    })
            })
    }, parseInt(timeOut) * 1000)

}

module.exports = {
    getAutoSignals: (req, res) => {
        mongoconnection.dbInstance((db) => {
            const database = db.db('signalant');
            database.collection('signals').find({ email: req.session.user.email }).toArray((err, result) => {
                if (err) throw err;
                console.log(result);
                res.json({ status: 200, 'alerts_signals': result });
            });
        })
    },

    createAutoSignal: (req, res) => {
        const { indicator } = req.body;
        mongoconnection.dbInstance((db) => {
            const database = db.db('signalant');
            database.collection('signals').insert({ ...req.body, email: req.session.user.email }, (err, result) => {
                if (err) throw err;
                const alert_id = result.insertedIds['0'];
                if (indicator === 'rsi') {
                    createRSISignal({ ...req.body, alert_id: alert_id, email: req.session.user.email },);
                } else if (indicator === 'bollinger_bands') {
                    createBollingerBands({ ...req.body, alert_id: alert_id });
                }

                res.json({ status: 200 });
            })
        });
    },

    deleteAutoSignal: (req, res) => {
        const { id } = req.query;
        mongoconnection.dbInstance((db) => {
            const database = db.db('signalant');
            database.collection('signals').remove({ _id: ObjectId(id) }, true);
            database.collection('signals').find({}).toArray((err, result) => {
                if (err) throw err;
                console.log('alert signal delted');
                clearInterval(alertSignalInterval[id]);
                console.log('indicator timer stopped with this id', id);
                res.json({ status: 200, 'alerts_signals': result });
            });
        })
    }
};
