const fetch = require('node-fetch');
const { ObjectId } = require('mongodb');
const moment = require('moment');
const cron = require('node-cron');
const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const { mongoconnection } = require('../config/mongoconnection');
const { generateSignalantTemplate } = require('../common/mailTemplate');

let database;

mongoconnection.dbInstance((db) => {
    database = db.db('signalant');
});

let alertSignalInterval = [];

const INDICATOR_ALERTS_MAPPING = {
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
    } = signalData;
    const { period, ohlc } = indicatorParameters;
    alertSignalInterval[alert_id] = setInterval(() => {
        const total_alerts = total;
        const daily_alerts = daily;
        database.collection('alerts').find({ email, alert_id }).toArray((err, result) => {
            if (result.length <= total_alerts) {
                const todays_alerts = result.filter(alert => alert.created_at === moment().format("MMM Do YY"));
                if (todays_alerts.length <= daily_alerts) {
                    fetch(`https://www.alphavantage.co/query?function=SMA&symbol=${currencyPair}&interval=${timeFrame}&time_period=${period}&series_type=${ohlc}&apikey=H91OK5G7SWN2UH50`)
                        .then(res => res.json())
                        .then(json => {

                            const sma_analysis_keys = Object.keys(json["Technical Analysis: SMA"]);
                            const sma_analysis = json["Technical Analysis: SMA"][sma_analysis_keys[0]];
                            const sma_value = parseFloat(sma_analysis['SMA']);
                            const currency_key = ohlc.includes('close') ? '4. close' : '1. open';

                            const fromSymbol = currencyPair.split('').splice(0, 3).join('');
                            const toSymbol = currencyPair.split('').splice(3).join('');

                            fetch(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&apikey=LZ80Z101ZA1Q3SKY`)
                            .then(res => res.json())
                            .then(response => {
                                
                                const current_price_keys = Object.keys(response['Time Series FX (Daily)']);
                                const recent_currency_ex = parseFloat(response['Time Series FX (Daily)'][current_price_keys[0]][currency_key]);

                                let alert = {
                                    currencyPair,
                                    indicator: 'SMA',
                                    created_at: moment().format("MMM Do YY"),
                                    indicator_value: sma_value,
                                    alert_id,
                                };

                                if (sma_value < recent_currency_ex) {

                                    alert = {
                                        ...alert,
                                        sellPrice: '',
                                        buyPrice: recent_currency_ex,
                                    };

                                    const mailData = {  
                                        currencyPair,
                                        alertType: 'BUY',
                                        price: recent_currency_ex,
                                        indicator: 'SMA',  
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


                                } else {

                                    alert = {
                                        ...alert,
                                        sellPrice: recent_currency_ex,
                                        buyPrice: '',
                                    };

                                    const mailData = {  
                                        currencyPair,
                                        alertType: 'SELL',
                                        price: recent_currency_ex,
                                        indicator: 'SMA',  
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

                                }
                            });
                        });

                }
            } else {
                clearInterval( alertSignalInterval[alert_id]);
            }
        });

    }, INDICATOR_ALERTS_MAPPING[timeFrame] * 1000);

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
    } = signalData;
    const { period, ohlc } = indicatorParameters;
    alertSignalInterval[alert_id] = setInterval(() => {
        const total_alerts = total;
        const daily_alerts = daily;
        database.collection('alerts').find({ email, alert_id }).toArray((err, result) => {
            if (result.length <= total_alerts) {
                const todays_alerts = result.filter(alert => alert.created_at === moment().format("MMM Do YY"));
                if (todays_alerts.length <= daily_alerts) {
                    fetch(`https://www.alphavantage.co/query?function=EMA&symbol=${currencyPair}&interval=${timeFrame}&time_period=${period}&series_type=${ohlc}&apikey=H91OK5G7SWN2UH50`)
                        .then(res => res.json())
                        .then(json => {

                            const ema_analysis_keys = Object.keys(json["Technical Analysis: EMA"]);
                            const ema_analysis = json["Technical Analysis: EMA"][ema_analysis_keys[0]];
                            const ema_value = parseFloat(ema_analysis['EMA']);
                            const currency_key = ohlc.includes('close') ? '4. close' : '1. open';

                            const fromSymbol = currencyPair.split('').splice(0, 3).join('');
                            const toSymbol = currencyPair.split('').splice(3).join('');

                            fetch(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&apikey=LZ80Z101ZA1Q3SKY`)
                            .then(res => res.json())
                            .then(response => {
                                
                                const current_price_keys = Object.keys(response['Time Series FX (Daily)']);
                                const recent_currency_ex = parseFloat(response['Time Series FX (Daily)'][current_price_keys[0]][currency_key]);

                                let alert = {
                                    currencyPair,
                                    indicator: 'EMA',
                                    created_at: moment().format("MMM Do YY"),
                                    indicator_value: ema_value,
                                    alert_id,
                                };

                                if (ema_value < recent_currency_ex) {

                                    alert = {
                                        ...alert,
                                        sellPrice: '',
                                        buyPrice: recent_currency_ex,
                                    };

                                    const mailData = {  
                                        currencyPair,
                                        alertType: 'BUY',
                                        price: recent_currency_ex,
                                        indicator: 'EMA',  
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


                                } else {

                                    alert = {
                                        ...alert,
                                        sellPrice: recent_currency_ex,
                                        buyPrice: '',
                                    };

                                    const mailData = {  
                                        currencyPair,
                                        alertType: 'SELL',
                                        price: recent_currency_ex,
                                        indicator: 'EMA',  
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

                                }
                            });
                        });

                }
            } else {
                clearInterval( alertSignalInterval[alert_id]);
            }
        });

    }, INDICATOR_ALERTS_MAPPING[timeFrame] * 1000);
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
    } = signalData;
    const { level, period } = indicatorParameters;
    const { timeOut, timeOutHours } = signalTimeFrame;

    console.log('time frame created', timeFrame);

    alertSignalInterval[alert_id] = setInterval(() => {
        const current_time = (new Date()).getTime();
        const total_alerts = total;
        const daily_alerts = daily;
        database.collection('alerts').find({ email, alert_id }).toArray((err, result) => {
            if (total_alerts === daily_alerts) {
                if (result.length <= daily_alerts) {
                    fetch(`https://www.alphavantage.co/query?function=RSI&symbol=${currencyPair}&interval=${timeFrame}&time_period=${parseInt(period)}&series_type=${ohlc}&apikey=JJJLU0RT9LACJCYK`)
                    .then(res => res.json())
                    .then(json => {
                        const rsi_analysis_keys = Object.keys(json["Technical Analysis: RSI"]);
                        const rsi_analysis = json["Technical Analysis: RSI"];
                        const rsi = parseFloat(rsi_analysis[rsi_analysis_keys[0]]["RSI"]);
                        let alert = {
                            currencyPair,
                            indicator: indicator.toUpperCase(),
                            created_at: moment().format("MMM Do YY"),
                            indicator_value: rsi,
                            alert_id,
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
                        
                        const mailData = {  
                            currencyPair,
                            alertType: rsi > 30 ? 'SELL' : 'BUY',
                            price: rsi,
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
                    })
                } else {
                    clearInterval(alertSignalInterval[alert_id]);
                }
            } else {
                const todays_alerts = result.filter(alert => alert.created_at === moment().format("MMM Do YY"));
                if (todays_alerts.length <= daily_alerts) {
                    fetch(`https://www.alphavantage.co/query?function=RSI&symbol=${currencyPair}&interval=${timeFrame}&time_period=${parseInt(period)}&series_type=${ohlc}&apikey=JJJLU0RT9LACJCYK`)
                    .then(res => res.json())
                    .then(json => {
                        const rsi_analysis_keys = Object.keys(json["Technical Analysis: RSI"]);
                        const rsi_analysis = json["Technical Analysis: RSI"];
                        const rsi = parseFloat(rsi_analysis[rsi_analysis_keys[0]]["RSI"]);
                        let alert = {
                            currencyPair,
                            indicator: indicator.toUpperCase(),
                            created_at: moment().format("MMM Do YY"),
                            indicator_value: rsi,
                            alert_id,
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
                        
                        const mailData = {  
                            currencyPair,
                            alertType: rsi > 30 ? 'SELL' : 'BUY',
                            price: rsi,
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
                        })
                    })
                } else {
                    clearInterval(alertSignalInterval[alert_id]);
                }
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
                                    const current_price_keys = Object.keys(response['Time Series FX (Daily)']);
                                    const recent_currency_ex = parseFloat(response['Time Series FX (Daily)'][current_price_keys[0]][currency_key]);
                                    const bb_analysis_lower_band = parseFloat(bb_analysis['Real Lower Band']);
                                    const bb_analysis_higher_band = parseFloat(bb_analysis['Real Upper Band']);
                                    
                                    let alert = {
                                        currencyPair,
                                        indicator: 'BOLLINGER BANDS',
                                        created_at: moment().format("MMM Do YY"),
                                        indicator_value: recent_currency_ex,
                                        alert_id,
                                    };

                                    if ((bb_analysis_higher_band - recent_currency_ex) < (recent_currency_ex - bb_analysis_lower_band)) {
                                        console.log('buy signal');

                                        alert = {
                                            ...alert,
                                            sellPrice: '',
                                            buyPrice: recent_currency_ex,
                                        };

                                        const mailData = {  
                                            currencyPair,
                                            alertType: 'BUY',
                                            price: recent_currency_ex,
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

                                    } else {
                                        console.log('sell signal');

                                        alert = {
                                            ...alert,
                                            sellPrice: recent_currency_ex,
                                            buyPrice: '',
                                        };

                                        const mailData = {  
                                            currencyPair,
                                            alertType: 'SELL',
                                            price: recent_currency_ex,
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
    
                            if (macd > macd_signal) {
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
    
                            } else {
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
                    createRSISignal({ ...req.body, alert_id: alert_id, email: req.session.user.email, created_at: (new Date()).getTime() },);
                } else if (indicator === 'bollinger_bands') {
                    createBollingerBands({ ...req.body, alert_id: alert_id, email: req.session.user.email, created_at: (new Date()).getTime() });
                } else if (indicator === 'macd') {
                    createMACDSignals({ ...req.body, alert_id: alert_id, email: req.session.user.email, created_at: (new Date()).getTime() });
                } else if (indicator === 'simple_moving_average') {
                    createSimpleMovingAverageSignal({ ...req.body, alert_id: alert_id, email: req.session.user.email, created_at: (new Date()).getTime() });
                } else if (indicator === 'exponential_moving_average') {
                    createExponentialMovingAverage({ ...req.body, alert_id: alert_id, email: req.session.user.email, created_at: (new Date()).getTime() });
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
