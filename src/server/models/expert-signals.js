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



let expertSignalInterval = [];


const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'udaypydi333@gmail.com',
      pass: 'dupkhotwvolgdgla'
    }
}));

const INDICATOR_ALERTS_MAPPING = {
    '5min': 5 * 60,
    '30min': 30 * 60,
    '1hour': 60 * 60,
    '1week': 7 * 24 * 60,
};


function startExpertSignalService(indicator) {
    const { stopLoss, targetProfit, timeFrame, expiryTime, currencyPair, alerts, alert_id, email } = indicator;

    expertSignalInterval[alert_id] = setInterval(() => {
        fetch(`https://forex.1forge.com/1.0.3/convert?from=${currencyPair.split('')[0]}&to=${currencyPair.split('')[1]}&quantity=1&api_key=uD3ghInLCfnn7gsSKAwV3D1nnp1X55x8`)
            .then(res => res.json())
            .then(json => {
                const value = json.value;
                const alertData = {
                    alert_id,
                    created_at: new Date(),
                    currency_pair,
                    email,
                    price: json.value,
                    type: 'EXPERT_ALERTS',
                };

             
                    
                if (value === parseFloat(targetProfit) || value - parseFloat(targetProfit) <= 0.002) {
                    alertData.alert_type = 'PROFIT';
                    database.collection('expert_alerts').insert({ email, alertData}, (err, result) => {
                        console.log('alert created');
                    })

                    const mailData = {  
                        currencyPair,
                        alertType: 'PROFIT',
                        price: value,
                        profitLoss: '-',
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

                    database.collection('expertsignals').updateOne({ email, _id: ObjectId(alert_id) }, { $set : { status: 'EXPIRED' } });
                    clearInterval(expertSignalInterval[alert_id]);
                } else  if (value === parseFloat(stopLoss) || value - parseFloat(stopLoss) <= 0.002) {
                    alertData.alert_type = 'LOSS';


                    const mailData = {  
                        currencyPair,
                        alertType: 'LOSS',
                        price: value,
                        profitLoss: '-',
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

                    database.collection('expertsignals').updateOne({ email, _id: ObjectId(alert_id) }, { $set : { status: 'EXPIRED' } });
                    database.collection('expert_alerts').insert({ email, alertData}, (err, result) => {
                        console.log('alert created');
                    })
                    clearInterval(expertSignalInterval[alert_id]);
                }
                
            })
    }, INDICATOR_ALERTS_MAPPING[timeFrame] * 1000);

}


module.exports = {
    createExpertSignal: (req, res) => {
        const { indicator } = req.body;
        database.collection('expertsignals').insert({ ...req.body, email: req.session.user.email } , (err, result) => {
            if (err) throw err;
            database.collection('users').update({ email: req.session.user.email }, {$set: { isExpert: true }});
            const alert_id = result.insertedIds['0'];
            startExpertSignalService({ ...req.body, alert_id, email: req.session.user.email  });
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