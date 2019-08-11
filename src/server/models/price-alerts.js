const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
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


let priceAlerts = [];

module.exports = {
    createPriceAlerts: (req, res) => {
        const { 
            name,
            currencyPair,
            price,
            alerts,
            timeFrame,
            timeBetweenAlerts,
            timeOutHours
        } = req.body;

        
        database.collection('price_alerts_signals').insert({ email: req.session.user.email, ...req.body }, (err, res) => {
            const alert_id = res.ops[0]._id;
            const created_at = (new Date()).getTime();

            priceAlerts[alert_id] = setInterval(() => {
                const current_id = alert_id;
                const compare_price = parseFloat(price);
                const current_time = (new Date()).getTime();
                if (current_time - created_at >= timeOutHours * 60 * 60 * 1000) {
                    clearInterval(alertSignalInterval[current_id]);
                }  else {
                    fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currencyPair.split('').splice(0, 3).join('')}&to_currency=${currencyPair.split('').splice(3, 5).join('')}&apikey=QZ5AG7BLQD7TLXTZ`)
                    .then(res => res.json())
                    .then(json => {
                        const currencyData = json['Realtime Currency Exchange Rate'];
                        const currency_exchange = parseFloat(currencyData['5. Exchange Rate']);

                        if (compare_price < currency_exchange) {
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
                                created_time: new Date(),
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

                        } else {
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
                                created_time: new Date(),
                            };
                            
                            database.collection('price_alerts').insert({ email: req.session.user.email, ...alert_data}, (err, result) => {
                                if (err) throw err;
                                console.log('alert inserted');
                            });

                            const mail_template = generateSignalantTemplate(mailData)
        
                            const mailConfig = {
                                from: 'udaypydi333@gmail.com',
                                to: ['udaypydi333@gmail.com', 'mail@adithyan.in'],
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
                
            }, parseInt(timeBetweenAlerts) * 1000);
           
        });
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
    }
};

