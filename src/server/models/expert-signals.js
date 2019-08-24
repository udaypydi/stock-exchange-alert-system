const fetch = require('node-fetch');
const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const uuidv4 = require('uuid/v4');
const { ObjectId } = require('mongodb');
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

let rsiInterval = [];
let pipService = [];
let pipArray = {};

function startPipCountService(pipData) {
    const pip_index = pipData.alert_id;
    pipArray[pip_index] = { loss: 0, profit: 0 };
    
    pipService[pip_index] = setInterval(() => {
        const {
            ohlc,
            alerts,
            currencyPair,
            stop_loss,
            target_profit,
            tradeLots,
            email,
            followers,
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

        const URL = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${currencyPair.split('').splice(0, 3).join('')}&to_symbol=${currencyPair.split('').splice(3, 6).join('')}&interval=1min&apikey=IFRN6HIL90MFHQP4`;

        fetch(URL)
            .then(res => res.json())
            .then(json => {
                console.log(pipArray);
                const pip_data_key = Object.keys(json['Time Series FX (1min)']);
                const pip_data = json["Time Series FX (1min)"];
                const current_exchange_value = parseFloat(pip_data[pip_data_key[0]][uhlc_key]);
                const prev_exchange_value = parseFloat(pip_data[pip_data_key[1]][uhlc_key]);

                if (current_exchange_value > prev_exchange_value) {
                    if (alerts === 'sell') {
                        pipArray[pip_index].profit ++;
                    } else {
                        pipArray[pip_index].loss ++;
                    }  
                } else {
                    if (alerts === 'sell') {
                        pipArray[pip_index].loss ++;
                    } else {
                        pipArray[pip_index].profit ++;
                    } 
                }

                if (pipArray[pip_index].loss === parseInt(stop_loss)) {
                    const loss = parseInt(tradeLots) * 0.0001 * parseInt(stop_loss);

                    const data = {
                        total_loss_profit: loss.toFixed(4),
                        currency_pair: currencyPair,
                        transaction_type: 'loss',
                        buy_sell_price: current_exchange_value,
                        created_time: new Date(),
                        email, 
                    };

                    const mailData = {  
                        currencyPair,
                        alertType: alerts,
                        price: current_exchange_value,
                        indicator: 'RSI',  
                        profitLoss: loss.toFixed(4),
                    };

                    const mail_template = generateSignalantTemplate(mailData)

                    const mailConfig = {
                        from: 'udaypydi333@gmail.com',
                        to: ['udaypydi333@gmail.com', 'mail@adithyan.in', ...followers],
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
                    

                    database.collection('expert_alerts').insert(data, (err, result) => {
                        if (err) throw err;
                        console.log('saved loss signal');
                    });
                    clearInterval(pipService[pip_index]);
                } else if (pipArray[pip_index].profit === parseInt(target_profit)) {
                    const profit = parseInt(tradeLots) * 0.0001 * parseInt(target_profit)
                    const data = {
                        total_loss_profit: profit.toFixed(4),
                        currency_pair: currencyPair,
                        transaction_type: 'profit',
                        buy_sell_price: current_exchange_value,
                        created_time: new Date(),
                        email, 
                    };

                    const mailData = {  
                        currencyPair,
                        alertType: alerts,
                        price: current_exchange_value,
                        indicator: 'RSI',  
                        profitLoss: profit.toFixed(4),
                    };

                    const mail_template = generateSignalantTemplate(mailData)

                    const mailConfig = {
                        from: 'udaypydi333@gmail.com',
                        to: ['udaypydi333@gmail.com', 'mail@adithyan.in', ...followers],
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

                    database.collection('expert_alerts').insert(data, (err, result) => {
                        if (err) throw err;
                        console.log('saved loss signal');
                    })
                    clearInterval(pipService[pip_index]);
                }
            })
    }, 60 * 1000);
    
    // buy 
}

function createRSISignal(signalData) {
    const { 
        currencyPair, 
        indicatorParameters, 
        ohlc, 
        indicator, 
        alerts, 
        alert_id, 
        stopLoss, 
        targetProfit, 
        tradeLots,
        email,
    } = signalData;
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

                console.log(`alert signal created at ${new Date()}`, parseFloat(rsi));

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
                            tradeLots,
                            email,
                        };

                        console.log('sell alert created');
                        console.log('starting pip service');
                        console.log('stopping indicator alert service');

                        startPipCountService({ ...pipData, followers: JSON.parse(req.session).user.followers });
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
                            tradeLots,
                            email,
                        };


                        console.log('buy alert created');
                        console.log('starting pip service');
                        console.log('stopping indicator alert service');

                        startPipCountService({ ...pipData, followers: JSON.parse(req.session).user.followers });
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
    }, 3000);
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
                createRSISignal({ ...req.body, alert_id: alert_id, email: req.session.user.email });
            }
            res.json({ status: 200 });
        });
    },

    fetchExperts: (req, res) => {
        database.collection('users').find({ isExpert: true }).toArray((err, result) => {
            if (err) throw err;
            res.json({ experts: result });
        })
    },

    followUnfollowExperts: (req, res) => {
        const { email } = req.body;
        const { user } = req.session;
        let following = user.following;
        const followingExpertIndex = following.indexOf(email);
        if (followingExpertIndex === -1) {
            following.push(email);
        } else {
            following.splice(followingExpertIndex, 1);
        }

        database.collection('users').updateOne({ email: user.email }, { $set: { "following": following }}, );
        database.collection('users').find({ email: email }).toArray((err, result) => {
            if (err) throw err;
            let followers = result[0].followers;
            const followerExpertIndex = followers.indexOf(user.email);
            if (followerExpertIndex === -1) {
                followers.push(user.email);
            } else {
                followers.splice(followerExpertIndex, 1);
            }
            database.collection('users').updateOne({ email: email }, { $set: { "followers": followers }}, );

            res.json({ following, status: 200 });
        });
        // database.collection('users').update({ email }, { $set: { followers:  }});
        
    },

    getExpertSignals: (req, res) => {
        database.collection('expertsignals').find({ email: req.session.user.email }).toArray((err, result) => {
            if (err) throw err;
            res.json({ expertSignals: result });
        })
    }
}