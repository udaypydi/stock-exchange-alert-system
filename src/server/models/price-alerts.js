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
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: 'noreply@signalant.com',
      pass: 'Welcome@@@123'
    }
}));

const pricealertsmapping = {
    '5min': 5 * 60,
    '30min': 30 * 60,
    '1hour': 60 * 60,
    '1week': 7 * 24 * 60,
};

let priceAlerts = [];

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

        
        database.collection('price_alerts_signals').insert({ email: req.session.user.email, ...req.body }, (err, res) => {
            const alert_id = res.ops[0]._id;

            priceAlerts[alert_id] = setInterval(() => {
                const compare_price = parseFloat(price);
                const total_alerts = total;
                const daily_alerts = daily;

                console.log('********Total Alerts********', total_alerts);
                console.log('********Daily Alerts********', daily_alerts);

                database.collection('price_alerts').find({ email, alert_id }).toArray((err, result) => {

                    console.log('********Alerts Created********', result.length);

                    if (result.length < total_alerts) {
                        const todays_alerts = result.filter(alert => alert.created_at === moment().format("MMM Do YY"));
                        if (todays_alerts.length <= daily_alerts) {
                            fetch(`https://api.1forge.com/convert?from=${currencyPair.split('').splice(0, 3).join('')}&to=${currencyPair.split('').splice(3, 5).join('')}&quantity=1&api_key=uD3ghInLCfnn7gsSKAwV3D1nnp1X55x8`)
                            .then(res => res.json())
                            .then(json => { 
                                const currency_exchange = json.value;
        
                                if (compare_price < currency_exchange && alerts.indexOf('high') !== -1) {
                                    const mailData = {  
                                        currencyPair,
                                        alertType: 'Price High',
                                        price: currency_exchange,
                                        indicator: 'Price Alerts',  
                                        profitLoss: '-',
                                        ...getAllAlerts(email),
                                    };
                
                                    const alert_data = {
                                        currency_pair: currencyPair,
                                        alert_type: 'Price High',
                                        price: currency_exchange,
                                        created_at: moment().format("MMM Do YY"),
                                        type: 'PRICE_ALERTS',
                                        alert_id,
                                    };
        
                                    const mail_template = generateSignalantTemplate(mailData)
                
                                    const mailConfig = {
                                        from: 'noreply@signalant.com',
                                        to: [req.session.user.email],
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
                                        ...getAllAlerts(email),
                                    };
                
                                    const alert_data = {
                                        currency_pair: currencyPair,
                                        alert_type: 'Price Low',
                                        price: currency_exchange,
                                        created_at: moment().format("MMM Do YY"),
                                        type: 'PRICE_ALERTS',
                                        alert_id,
                                        status: 'ACTIVE',
                                    };
                                    
                                    database.collection('price_alerts').insert({ email: req.session.user.email, ...alert_data}, (err, result) => {
                                        if (err) throw err;
                                        console.log('alert inserted');
                                    });
        
                                    const mail_template = generateSignalantTemplate(mailData)
                
                                    const mailConfig = {
                                        from: 'noreply@signalant.com',
                                        to: [req.session.user.email],
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
                        database.collection('price_alerts_signals').updateOne({ email: req.session.user.email, _id: ObjectId(alert_id) }, { $set : { status: 'EXPIRED' } });
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

    fetchAlertById: (req, res) => {
        const { id } = req.query;
        database.collection('price_alerts_signals').find({ _id: ObjectId(id) }).toArray((err, result) => {
            res.json(result[0]);
        });
    },

    deletePriceAlertSignals: (req, res) => {
        const { id } = req.query;
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

