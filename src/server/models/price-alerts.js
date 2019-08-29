const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
const { ObjectId } = require('mongodb');
const moment = require('moment');
const smtpTransport = require('nodemailer-smtp-transport');
const { mongoconnection } = require('../config/mongoconnection');
const { generateSignalantTemplate } = require('../common/mailTemplate');

let database;

mongoconnection.dbInstance((db) => {
    database = db.db('signalant');
});


const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'udaypydi333@gmail.com',
      pass: 'dupkhotwvolgdgla'
    }
}));

const pricealertsmapping = {
    '5min': 5 * 60,
    '30min': 30 * 60,
    '1hour': 60 * 60,
    '1week': 7 * 24 * 60,
};

let priceAlerts = [];

module.exports = {
    createPriceAlerts: (req, res) => {
        const { 
            name,
            currencyPair,
            price,
            alerts,
            timeFrame,
            total,
            daily,
        } = req.body;

        const email = req.session.user.email;

        console.log('price alerts', req.body);

        
        database.collection('price_alerts_signals').insert({ email: req.session.user.email, ...req.body }, (err, res) => {
            const alert_id = res.ops[0]._id;

            priceAlerts[alert_id] = setInterval(() => {
                const compare_price = parseFloat(price);
                const total_alerts = total;
                const daily_alerts = daily;

                database.collection('price_alerts').find({ email, alert_id }).toArray((err, result) => {
                    if (result.length <= total_alerts) {
                        const todays_alerts = result.filter(alert => alert.created_at === moment().format("MMM Do YY"));
                        if (todays_alerts.length <= daily_alerts) {
                            fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currencyPair.split('').splice(0, 3).join('')}&to_currency=${currencyPair.split('').splice(3, 5).join('')}&apikey=QZ5AG7BLQD7TLXTZ`)
                            .then(res => res.json())
                            .then(json => {
                                const currencyData = json['Realtime Currency Exchange Rate'];
                                const currency_exchange = parseFloat(currencyData['5. Exchange Rate']);
        
                                if (compare_price < currency_exchange && alerts.indexOf('high') !== -1) {
                                    const mailData = {  
                                        currencyPair,
                                        alertType: 'Price High',
                                        price: currency_exchange,
                                        indicator: 'Price Alerts',  
                                        profitLoss: '-',
                                    };
                
                                    const alert_data = {
                                        currency_pair: currencyPair,
                                        alert_type: 'Price High',
                                        price: currency_exchange,
                                        created_at: moment().format("MMM Do YY"),
                                        alert_id,
                                    };
        
                                    const mail_template = generateSignalantTemplate(mailData)
                
                                    const mailConfig = {
                                        from: 'udaypydi333@gmail.com',
                                        to: ['udaypydi333@gmail.com', 'mail@adithyan.in'],
                                        subject: 'Signalant Price Alerts',
                                        html: mail_template,
                                    };
        
                                    database.collection('price_alerts').insert({ email: req.session.user.email, ...alert_data}, (err, result) => {
                                        if (err) throw err;
                                        console.log('alert inserted');
                                    });
        
                                    transporter.sendMail(mailConfig, function(error, info){
                                        if (error) {
                                          console.log(error);
                                        } else {
                                          console.log('Email sent: ' + info.response);
                                        }
                                      });
                                } else if (compare_price > currency_exchange && alerts.indexOf('low') !== -1) {
                                    const mailData = {  
                                        currencyPair,
                                        alertType: 'Price Low',
                                        price: currency_exchange,
                                        indicator: 'Price Alerts',  
                                        profitLoss: '-',
                                    };
                
                                    const alert_data = {
                                        currency_pair: currencyPair,
                                        alert_type: 'Price Low',
                                        price: currency_exchange,
                                        created_at: moment().format("MMM Do YY"),
                                        alert_id,
                                    };
                                    
                                    database.collection('price_alerts').insert({ email: req.session.user.email, ...alert_data}, (err, result) => {
                                        if (err) throw err;
                                        console.log('alert inserted');
                                    });
        
                                    const mail_template = generateSignalantTemplate(mailData)
                
                                    const mailConfig = {
                                        from: 'udaypydi333@gmail.com',
                                        to: ['udaypydi333@gmail.com'],
                                        subject: 'Signalant Price Alerts Alerts',
                                        html: mail_template,
                                    };
        
                                    transporter.sendMail(mailConfig, function(error, info){
                                        if (error) {
                                          console.log(error);
                                        } else {
                                          console.log('Email sent: ' + info.response);
                                        }
                                      });
                                }
                            });
                        }
                    } else {
                        clearInterval(priceAlerts[alert_id]);
                    }
                });
            }, pricealertsmapping[timeFrame] * 1000);
        });

        res.json({ status: 200, statusText: "OK" });
    },

    getPriceAlerts: (req, res) => {
        database.collection('price_alerts').find({ email: req.session.user.email }).toArray((err, result) => {
            res.json({ 
                alerts: result,
                status: 200,
            });
        });
    },

    getPriceAlertSignals: (req, res) => {
        database.collection('price_alerts_signals').find({ email: req.session.user.email }).toArray((err, result) => {
            res.json({
                alerts: result,
                status: 200,
            });
        });
    },

    deletePriceAlertSignals: (req, res) => {
        const { id } = req.query;
        console.log(id);
        mongoconnection.dbInstance((db) => {
            const database = db.db('signalant');
            database.collection('price_alerts_signals').remove({ _id: ObjectId(id) }, true);
            database.collection('price_alerts_signals').find({ email: req.session.user.email }).toArray((err, result) => {
                if (err) throw err;
                console.log('alert signal deleted');
                clearInterval(priceAlerts[id]);
                console.log('indicator timer stopped with this id', id);
                console.log(result);
                res.json({ status: 200, 'alerts': result });
            });
        })
    }
};

