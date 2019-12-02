const fetch = require('node-fetch');
const { ObjectId } = require('mongodb');
const moment = require('moment');
const cron = require('node-cron');
const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
var RSI = require('technicalindicators').RSI;
const { mongoconnection } = require('../config/mongoconnection');
const { generateSignalantTemplate } = require('../common/mailTemplate');
const { sendSMAAlert, calculateSMA } = require('./sma');
const { sendEMAAlert, calculateEMA } = require('./ema');

let database;
let sma = {};
let ema = {};
let rsi = {};
let indicatorCalculationInterval = {};

mongoconnection.dbInstance((db  ) => {
    database = db.db('signalant');
});

let alertSignalInterval = {};
let prevAlertType = {};


const INDICATOR_ALERTS_MAPPING = {
    '1min': 1 * 60,
    '5min': 5 * 60,
    '30min': 30 * 60,
    '1hour': 60 * 60,
    '1week': 7 * 24 * 60,
};

const transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: 'noreply@signalant.com',
      pass: 'Welcome@@@123'
    }
}));

function getAllAlerts(email) {
    database.collection('price_alerts').find({ email }).toArray((error, pricealerts) => {
        database.collection('expert_alerts').find({ email }).toArray((error, expertalerts) => {
            database.collection('alerts').find({ email }).toArray((err, indicatorSignals) => {
                return {
                    priceAlerts: pricealerts.length,
                    expertAlerts: expertalerts.length,
                    indicatorAlerts: indicatorSignals.length,
                };
            });
        });
    });
}


function createSimpleMovingAverageSignal(signalData) {
    const { 
        currencyPair, 
        timeFrame, 
        indicatorParameters,  
        alert_id, 
        email,
        total,
        daily,
        priceValues,
    } = signalData;
    const { period, ohlc } = indicatorParameters;

    (() => {
        sma[alert_id] = calculateSMA(priceValues[currencyPair], period);
    })();

    indicatorCalculationInterval[alert_id] = setInterval(() => {
        sma[alert_id] = calculateSMA(priceValues[currencyPair], period);
    }, INDICATOR_ALERTS_MAPPING[timeFrame] * 1000);

    alertSignalInterval[alert_id] = setInterval(() => {
        const total_alerts = total;
        const daily_alerts = daily;
        database.collection('alerts').find({ email, alert_id }).toArray((err, result) => {
            if (result.length <= total_alerts) {
                const todays_alerts = result.filter(alert => alert.created_at === moment().format("MMM Do YY"));
                if (todays_alerts.length <= daily_alerts) {
                    if (todays_alerts.length <= daily_alerts) {
                        if (sma[alert_id] < priceValues[currencyPair].currentPrice && (prevAlertType[alert_id] === undefined || prevAlertType[alert_id] === 'SELL')) {
                            const alertData = {
                                currencyPair,
                                indicator_value: sma[alert_id],
                                alert_id,
                                sellPrice: '',
                                buyPrice: priceValues[currencyPair].currentPrice,
                                allAlerts: getAllAlerts(email),
                                price: priceValues[currencyPair].currentPrice,
                                alertType: 'BUY',
                                email,
                            };

                            sendSMAAlert(alertData);
                            prevAlertType[alert_id] = 'BUY';
                        } else if (sma[alert_id] > priceValues[currencyPair].currentPrice && (prevAlertType[alert_id] === undefined || prevAlertType[alert_id] === 'BUY')) {
                            const alertData = {
                                currencyPair,
                                indicator_value: sma[alert_id],
                                alert_id,
                                buyPrice: '',
                                sellPrice: priceValues[currencyPair].currentPrice,
                                allAlerts: getAllAlerts(email),
                                price: priceValues[currencyPair].currentPrice,
                                alertType: 'SELL',
                                email,
                            };

                            sendSMAAlert(alertData);
                            prevAlertType[alert_id] = 'SELL';

                        }
                    }
                }
            } else {
                clearInterval( alertSignalInterval[alert_id]);
                clearInterval(indicatorCalculationInterval[alert_id]);
            }
        });

    }, 1000);

}

function createExponentialMovingAverage(signalData) {
    const { 
        currencyPair, 
        timeFrame, 
        indicatorParameters,  
        alert_id, 
        email,
        total,
        daily,
        priceValues,
    } = signalData;
    const { period, ohlc } = indicatorParameters;


    (() => {
        ema[alert_id] = calculateEMA(priceValues[currencyPair], period);
    })();

    indicatorCalculationInterval[alert_id] = setInterval(() => {
        ema[alert_id] = calculateEMA(priceValues[currencyPair], period);
    }, INDICATOR_ALERTS_MAPPING[timeFrame] * 1000);

    alertSignalInterval[alert_id] = setInterval(() => {
        const total_alerts = total;
        const daily_alerts = daily;
        database.collection('alerts').find({ email, alert_id }).toArray((err, result) => {
            if (result.length <= total_alerts) {
                const todays_alerts = result.filter(alert => alert.created_at === moment().format("MMM Do YY"));
                if (todays_alerts.length <= daily_alerts) {
                    if (ema[alert_id] < priceValues[currencyPair].currentPrice && (prevAlertType[alert_id] === undefined || prevAlertType[alert_id] === 'SELL')) {
                        const alertData = {
                            currencyPair,
                            indicator_value: ema[alert_id],
                            alert_id,
                            sellPrice: '',
                            buyPrice: priceValues[currencyPair].currentPrice,
                            allAlerts: getAllAlerts(email),
                            price: priceValues[currencyPair].currentPrice,
                            alertType: 'BUY',
                            email,
                        };

                        sendEMAAlert(alertData);
                        prevAlertType[alert_id] = 'BUY';
                    } else if (ema[alert_id] > priceValues[currencyPair].currentPrice && (prevAlertType[alert_id] === undefined || prevAlertType[alert_id] === 'BUY')) {
                        const alertData = {
                            currencyPair,
                            indicator_value: ema[alert_id],
                            alert_id,
                            buyPrice: '',
                            sellPrice: priceValues[currencyPair].currentPrice,
                            allAlerts: getAllAlerts(email),
                            price: priceValues[currencyPair].currentPrice,
                            alertType: 'SELL',
                            email,
                        };

                        sendEMAAlert(alertData);
                        prevAlertType[alert_id] = 'SELL';

                    }
                }
            } else {
                clearInterval( alertSignalInterval[alert_id]);
                clearInterval(indicatorCalculationInterval[alert_id]);
            }
        });

    }, 1000);
}

function createRSISignal(signalData) {
    const { 
        currencyPair, 
        timeFrame, 
        indicatorParameters, 
        ohlc, 
        signalTimeFrame, 
        indicator, 
        alert_id, 
        email,
        created_at,
        total,
        daily,
        priceValues
    } = signalData;
    const { level, period } = indicatorParameters;
    const { timeOut, timeOutHours } = signalTimeFrame;

    // (() => {
    //     const { historicalPrices, currentPrice } = priceValues[currencyPair];
    //     const lastIndex = (historicalPrices.length - 1);
    //     const initIndex = lastIndex - parseInt(period);
    //     const priceArray = [];
    //     Object.keys(historicalPrices).forEach(key => {
    //         priceArray.push(historicalPrices[key]);
    //     });
    //     if (priceArray.length >= parseInt(period)) {
    //         const rsiValue = RSI.calculate({period : parseInt(period), values : priceArray });
    //         rsi[alert_id] = rsiValue[rsiValue.length - 1];
    //     }
    // })();
    alertSignalInterval[alert_id] = setInterval(() => {

        const { historicalPrices, currentPrice } = priceValues[currencyPair];
        const lastIndex = (historicalPrices.length - 1);
        const initIndex = lastIndex - parseInt(period);
        const priceArray = [];
        Object.keys(historicalPrices).forEach(key => {
            priceArray.push(historicalPrices[key]);
        });
        if (priceArray.length >= parseInt(period)) {
            const rsiValue = RSI.calculate({period : parseInt(period), values : priceArray });
            rsi[alert_id] = rsiValue[rsiValue.length - 1];
        }

        const total_alerts = total;
        const daily_alerts = daily;
        database.collection('alerts').find({ email, alert_id }).toArray((err, result) => {
            if (result.length <= total_alerts) {
                const todays_alerts = result.filter(alert => alert.created_at === moment().format("MMM Do YY"));
                if (todays_alerts.length <= daily_alerts) {
                    let alert = {
                        currencyPair,
                        indicator: indicator.toUpperCase(),
                        created_at: moment().format("MMM Do YY"),
                        indicator_value: rsi,
                        alert_id,
                    };
    
                    if (rsi[alert_id] > parseFloat(level) && (prevAlertType[alert_id] === undefined || prevAlertType[alert_id] === 'OVERSOLD')) {
                        alert = {
                            ...alert,
                            sellPrice: priceValues[currencyPair].currentPrice,
                            buyPrice: '',
                        };
                        const mailData = {  
                            currencyPair,
                            alertType: rsi[alert_id] > 70 ? 'OVERBOUGHT' : 'CROSSES LINE',
                            price: priceValues[currencyPair].currentPrice,
                            indicator: 'RSI',  
                            profitLoss: '-',
                            ...getAllAlerts(email),
                        };
        
                        const mail_template = generateSignalantTemplate(mailData)
        
                        const mailConfig = {
                            from: 'noreply@signalant.com',
                            to: [email],
                            subject: 'Signalant Alerts',
                            html: mail_template,
                        };
        
                        transporter.sendMail(mailConfig, function(error, info){
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                            });
                        database.collection('alerts').insert({ ...alert, email, type: 'INDICATOR_ALERTS' }, (err, result) => {
                            if (err) console.log(err);
                            console.log('alert created');
                        });

                        prevAlertType[alert_id] = 'CROSSESLINE';
                    } else if ((rsi[alert_id] <= 30 || rsi[alert_id] <= parseFloat(level)) && (prevAlertType[alert_id] === undefined || prevAlertType[alert_id] === 'CROSSESLINE')) {
                        alert = {
                            ...alert,
                            sellPrice: '',
                            buyPrice: priceValues[currencyPair].currentPrice,
                        };

                        const mailData = {  
                            currencyPair,
                            alertType: rsi[alert_id] > 30 ? 'CROSSES LINE' : 'OVERSOLD',
                            price: priceValues[currencyPair].currentPrice,
                            indicator: 'RSI',  
                            profitLoss: '-',
                            ...getAllAlerts(email),
                        };
        
                        const mail_template = generateSignalantTemplate(mailData)
        
                        const mailConfig = {
                            from: 'noreply@signalant.com',
                            to: [email],
                            subject: 'Signalant Alerts',
                            html: mail_template,
                        };
        
                        transporter.sendMail(mailConfig, function(error, info){
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                            });
                        database.collection('alerts').insert({ ...alert, email, type: 'INDICATOR_ALERTS' }, (err, result) => {
                            if (err) console.log(err);
                            console.log('alert created');
                        });

                        prevAlertType[alert_id] = 'OVERSOLD';
                    } 
                }
            } else {
                clearInterval( alertSignalInterval[alert_id]);
                clearInterval(indicatorCalculationInterval[alert_id]);
            }
        });

    }, INDICATOR_ALERTS_MAPPING[timeFrame] * 1000);
}


function createBollingerBands(signalData) {
    const { 
        currencyPair, 
        timeFrame, 
        indicatorParameters, 
        signalTimeFrame, 
        alert_id, 
        email,
        total,
        daily,
        priceValues
    } = signalData;
    const { deviation, period, ohlc } = indicatorParameters;
    const { timeOut } = signalTimeFrame;

    alertSignalInterval[alert_id] = setInterval(() => {

        const total_alerts = total;
        const daily_alerts = daily;

        database.collection('alerts').find({ email, alert_id }).toArray((err, result) => {
            if (result.length <= total_alerts) {
                const todays_alerts = result.filter(alert => alert.created_at === moment().format("MMM Do YY"));
                if (todays_alerts.length <= daily_alerts) {
                    fetch(`https://www.alphavantage.co/query?function=BBANDS&symbol=${currencyPair}&interval=${timeFrame}&time_period=${parseInt(period)}&series_type=${ohlc}&nbdevup=${parseInt(deviation)}&nbdevdn=${parseInt(deviation)}&apikey=JJJLU0RT9LACJCYK`)
                        .then(res => res.json())
                        .then(json => {
                            const bb_analysis_keys = Object.keys(json["Technical Analysis: BBANDS"]);
                            const bb_analysis = json["Technical Analysis: BBANDS"][bb_analysis_keys[0]];
                            const fromSymbol = currencyPair.split('').splice(0, 3).join('');
                            const toSymbol = currencyPair.split('').splice(3).join('');
                            const currency_key = ohlc.includes('close') ? '4. close' : '1. open';
            
                            fetch(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&apikey=JJJLU0RT9LACJCYK`)
                                .then(res => res.json())
                                .then(response => {
                                    const price = priceValues[currencyPair].currentPrice;

                                    const current_price_keys = Object.keys(response['Time Series FX (Daily)']);
                                    const recent_currency_ex = parseFloat(response['Time Series FX (Daily)'][current_price_keys[0]][currency_key]);
                                    const bb_analysis_lower_band = parseFloat(bb_analysis['Real Lower Band']);
                                    const bb_analysis_higher_band = parseFloat(bb_analysis['Real Upper Band']);
                                    
                                    let alert = {
                                        currencyPair,
                                        indicator: 'BOLLINGER BANDS',
                                        created_at: moment().format("MMM Do YY"),
                                        indicator_value: price,
                                        alert_id,
                                    };

                                    if ((bb_analysis_higher_band - price) < (price - bb_analysis_lower_band) && (prevAlertType[alert_id] === undefined || prevAlertType[alert_id] === 'SELL')) {

                                        alert = {
                                            ...alert,
                                            sellPrice: '',
                                            buyPrice: price,
                                        };

                                        const mailData = {  
                                            currencyPair,
                                            alertType: 'BUY',
                                            price: price,
                                            indicator: 'BOLLINGER BANDS',  
                                            profitLoss: '-',
                                            ...getAllAlerts(email),
                                        };
                        
                                        const mail_template = generateSignalantTemplate(mailData)
                        
                                        const mailConfig = {
                                            from: 'noreply@signalant.com',
                                            to: [email],
                                            subject: 'Signalant Alerts',
                                            html: mail_template,
                                        };
                        

                                        transporter.sendMail(mailConfig, function(error, info){
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        });

                                        database.collection('alerts').insert({ ...alert, email, type: 'INDICATOR_ALERTS' }, (err, result) => {
                                            if (err) console.log(err);
                                            console.log('alert created');
                                        });

                                        prevAlertType[alert_id] = 'BUY';

                                    } else if((bb_analysis_higher_band - price) > (price - bb_analysis_lower_band) && (prevAlertType[alert_id] === undefined || prevAlertType[alert_id] === 'BUY')) {

                                        alert = {
                                            ...alert,
                                            sellPrice: price,
                                            buyPrice: '',
                                        };

                                        const mailData = {  
                                            currencyPair,
                                            alertType: 'SELL',
                                            price: price,
                                            indicator: 'BOLLINGER BANDS',  
                                            profitLoss: '-',
                                            ...getAllAlerts(email),
                                        };
                        
                                        const mail_template = generateSignalantTemplate(mailData)
                        
                                        const mailConfig = {
                                            from: 'noreply@signalant.com',
                                            to: [email],
                                            subject: 'Signalant Alerts',
                                            html: mail_template,
                                        };                

                                        transporter.sendMail(mailConfig, function(error, info){
                                            if (error) {
                                                console.log(error);
                                            } else {
                                                console.log('Email sent: ' + info.response);
                                            }
                                        });

                                        database.collection('alerts').insert({ ...alert, email, type: 'INDICATOR_ALERTS' }, (err, result) => {
                                            if (err) console.log(err);
                                            console.log('alert created');
                                        });

                                        prevAlertType[alert_id] = 'SELL';
                                    }
                                })
                        });
                }
            } else {
                clearInterval(alertSignalInterval[alert_id]);
            }
        
        });
    }, INDICATOR_ALERTS_MAPPING[timeFrame] * 1000);

}

function createMACDSignals(signalData) {
    const { 
        currencyPair, 
        timeFrame, 
        indicatorParameters, 
        alert_id, 
        email,
        total,
        daily,
    } = signalData;
    const { fast, slow, signal, ohlc } = indicatorParameters;

    alertSignalInterval[alert_id] = setInterval(() => {
        const total_alerts = total;
        const daily_alerts = daily;

        database.collection('alerts').find({ email, alert_id }).toArray((err, result) => {
            if (result.length <= total_alerts) {
                const todays_alerts = result.filter(alert => alert.created_at === moment().format("MMM Do YY"));
                if (todays_alerts.length <= daily_alerts) {
                    fetch(`https://www.alphavantage.co/query?function=MACD&symbol=${currencyPair}&interval=${timeFrame}&series_type=${ohlc}&fastperiod=${fast}&slowperiod=${slow}&signalperiod=${signal}&apikey=EQ35YH50JURKTDGT`)
                    .then(res => res.json())
                    .then(json => {
                        const macd_analysis_keys = Object.keys(json["Technical Analysis: MACD"]);
                        const macd_analysis = json["Technical Analysis: MACD"][macd_analysis_keys[0]];
                        const macd = parseFloat(macd_analysis['MACD']);
                        const macd_signal = parseFloat(macd_analysis['MACD_Signal']);
                        const currency_key = ohlc.includes('close') ? '4. close' : '1. open';
                        const fromSymbol = currencyPair.split('').splice(0, 3).join('');
                        const toSymbol = currencyPair.split('').splice(3).join('');

                        fetch(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&apikey=LZ80Z101ZA1Q3SKY`)
                        .then(res => res.json())
                        .then(response => {
                            console.log('response of current price', response);

                            const current_price_keys = Object.keys(response['Time Series FX (Daily)']);
                            const recent_currency_ex = parseFloat(response['Time Series FX (Daily)'][current_price_keys[0]][currency_key]);

                            let alert = {
                                currencyPair,
                                indicator: 'MACD',
                                created_at: moment().format("MMM Do YY"),
                                indicator_value: macd,
                                alert_id,
                            };
    
                            if (macd > macd_signal && (prevAlertType[alert_id] === undefined || prevAlertType[alert_id] === "SELL") ) {
                                alert = {
                                    ...alert,
                                    sellPrice: '',
                                    buyPrice: recent_currency_ex,
                                };

                                const mailData = {  
                                    currencyPair,
                                    alertType: 'BUY',
                                    price: recent_currency_ex,
                                    indicator: 'MACD',  
                                    profitLoss: '-',
                                    ...getAllAlerts(email),
                                };
                
                                const mail_template = generateSignalantTemplate(mailData)
                
                                const mailConfig = {
                                    from: 'noreply@signalant.com',
                                    to: [email],
                                    subject: 'Signalant Alerts',
                                    html: mail_template,
                                };        

                                transporter.sendMail(mailConfig, function(error, info){
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });

                                database.collection('alerts').insert({ ...alert, email, type: 'INDICATOR_ALERTS' }, (err, result) => {
                                    if (err) console.log(err);
                                    console.log('alert created');
                                });
                                prevAlertType[alert_id] = 'BUY';

                            } else if (macd < macd_signal && (prevAlertType[alert_id] === undefined || prevAlertType[alert_id] === "BUY")) {
                                alert = {
                                    ...alert,
                                    sellPrice: recent_currency_ex,
                                    buyPrice: '',
                                };

                                const mailData = {  
                                    currencyPair,
                                    alertType: 'SELL',
                                    price: recent_currency_ex,
                                    indicator: 'MACD',  
                                    profitLoss: '-',
                                    ...getAllAlerts(email),
                                };
                
                                const mail_template = generateSignalantTemplate(mailData)
                
                                const mailConfig = {
                                    from: 'noreply@signalant.com',
                                    to: [email],
                                    subject: 'Signalant Alerts',
                                    html: mail_template,
                                };        

                                transporter.sendMail(mailConfig, function(error, info){
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });

                                database.collection('alerts').insert({ ...alert, email, type: 'INDICATOR_ALERTS' }, (err, result) => {
                                    if (err) console.log(err);
                                    console.log('alert created');
                                });

                                prevAlertType[alert_id] = 'SELL';
                            }
                        });
                    });
                }
            } else {
                clearInterval(alertSignalInterval[alert_id]);
            }
        });
    }, INDICATOR_ALERTS_MAPPING[timeFrame] * 1000);

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
                    console.log(req.body);
                    createRSISignal({ ...req.body, alert_id: alert_id, email: req.session.user.email, created_at: (new Date()).getTime(), priceValues: req.app.locals.priceValues });
                } else if (indicator === 'bollinger_bands') {
                    createBollingerBands({ ...req.body, alert_id: alert_id, email: req.session.user.email, created_at: (new Date()).getTime(), priceValues: req.app.locals.priceValues  });
                } else if (indicator === 'macd') {
                    createMACDSignals({ ...req.body, alert_id: alert_id, email: req.session.user.email, created_at: (new Date()).getTime() });
                } else if (indicator === 'simple_moving_average') {
                    createSimpleMovingAverageSignal({ ...req.body, alert_id: alert_id, email: req.session.user.email, created_at: (new Date()).getTime(), priceValues: req.app.locals.priceValues });
                } else if (indicator === 'exponential_moving_average') {
                    createExponentialMovingAverage({ ...req.body, alert_id: alert_id, email: req.session.user.email, created_at: (new Date()).getTime(), priceValues: req.app.locals.priceValues });
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
    },

    fetchSignalById: (req, res) => {
        const { id } = req.query;
        mongoconnection.dbInstance((db) => {
            const database = db.db('signalant');
            database.collection('signals').find({ _id: ObjectId(id) }).toArray((err, result) => {
                res.json(result[0]);
            })
        })
    }
};
