const fetch = require('node-fetch');
const uuidv4 = require('uuid/v4');
const { ObjectId } = require('mongodb');
const { mongoconnection } = require('../config/mongoconnection');

let database;

mongoconnection.dbInstance((db) => {
    database = db.db('signalant');
});


let rsiInterval = [];
let pipService = [];

function startPipCountService(pipData) {
    const pip_index = pipData.alert_id;
    pipService[pip_index] = setInterval(() => {
        let profitArray = 0;
        let lossArray = 0;
        const {
            ohlc,
            alerts,
            currencyPair,
            stop_loss,
            target_profit,
        } = pipData;

        let uhlc_key = '';

        if (ohlc === 'open') {
            uhlc_key = '1. open';
        } else if (ohlc === 'high') {
            uhlc_key = '2. high';
        } else if (ohlc === 'low') {
            uhlc_key = '3. low';
        } else if (ohlc === 'close') {
            uhlc_key = '4. close';
        } else {
            uhlc_key = '1. open';
        }

        fetch(`https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${currencyPair.split('').splice(0, 2)}&to_symbol=${currencyPair.split('').splice(3, 3)}&interval=1min&apikey=QZ5AG7BLQD7TLXTZ`)
            .then(res => res.json())
            .then(json => {
                const pip_data_key = Object.keys(json['Time Series FX (1min)']);
                const pip_data = json["Time Series FX (1min)"];
                const current_exchange_value = parseFloat(pip_data[pip_data_key[0]][uhlc_key]);
                const prev_exchange_value = parseFloat(pip_data[pip_data_key[1]][uhlc_key]);

                if (current_exchange_value > prev_exchange_value) {
                    if (alerts === 'sell') {
                        profitArray ++;
                    } else {
                        lossArray ++;
                    }  
                } else {
                    if (alerts === 'sell') {
                        lossArray ++;
                    } else {
                        profitArray ++;
                    } 
                }

                if (lossArray === stop_loss) {
                    console.log('loss signal generated');
                    clearInterval(pipService[pip_index]);
                } else if (profitArray === target_profit) {
                    console.log('profit signal generated');
                    clearInterval(pipService[pip_index]);
                }
            })
    }, 60 * 1000);
    
    // buy 
}

function createRSISignal(signalData) {
    const { currencyPair, indicatorParameters, ohlc, indicator, alerts, alert_id, stopLoss, targetProfit } = signalData;
    const { level, period } = indicatorParameters;

    console.log('alert_id for expert signals', alert_id);

    rsiInterval[alert_id] = setInterval(() => {
        fetch(`https://www.alphavantage.co/query?function=RSI&symbol=${currencyPair}&interval=5min&time_period=${parseInt(period)}&series_type=${ohlc}&apikey=QZ5AG7BLQD7TLXTZ`)
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

                console.log(`alert signal created at ${new Date()}`);

                if (rsi > parseFloat(level)) {
                    if (alerts === 'sell') {
                        clearInterval(rsiInterval[alert_id]);
                        const pipData = {
                            ohlc,
                            alerts,
                            currencyPair,
                            stop_loss: stopLoss,
                            target_profit: targetProfit,
                            alert_id,
                        };

                        console.log('sell alert created');
                        console.log('starting pip service');
                        console.log('stopping indicator alert service');

                        startPipCountService(pipData);
                        // start pip count service
                        // stop indicator service
                    }
                } else if (rsi <= 60) {
                    if (alerts === 'buy') {
                        clearInterval(rsiInterval[alert_id]);
                        const pipData = {
                            ohlc,
                            alerts,
                            currencyPair,
                            alert_id,
                        };


                        console.log('buy alert created');
                        console.log('starting pip service');
                        console.log('stopping indicator alert service');

                        startPipCountService(pipData);
                        // start pip count service
                        // stop indicator service
                    }
                }
                // mongoconnection.dbInstance((db) => {
                //     const database = db.db('signalant');
                //     database.collection('alerts').insert(alert, (err, result) => {
                //         if (err) console.log(err);
                //         console.log('alert created');
                //     })
                // });
            })
    }, 5 * 60 * 1000);
}

module.exports = {
    createExpertSignal: (req, res) => {
        const { indicator } = req.body;
        database.collection('expertsignals').insert({ ...req.body, email: req.session.user.email } , (err, result) => {
            if (err) throw err;
            database.collection('users').update({ email: req.session.user.email }, {$set: { isExpert: true }});
            const alert_id = result.insertedIds['0'];
            if (indicator === 'rsi') {
                console.log('indicator', alert_id);
                createRSISignal({ ...req.body, alert_id: alert_id });
            }
            res.json({ status: 200 });
        });
    },

    fetchExperts: (req, res) => {
        database.collection('users').find({ isExpert: true }).toArray((err, result) => {
            if (err) throw err;
            res.json({ experts: result });
        })
    }
}