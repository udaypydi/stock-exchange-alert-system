
const moment = require('moment');
const cron = require('node-cron');
const mailer = require('nodemailer');
const SMA = require('technicalindicators').SMA;
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
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


function sendSMAAlert(alertData) {
    const { alert_id, currencyPair, indicator_value, price, buyPrice, sellPrice, alertType, allAlerts, email } = alertData;
    let alert = {
        currencyPair,
        indicator: 'SMA',
        created_at: moment().format("MMM Do YY"),
        indicator_value,
        alert_id,
        sellPrice,
        buyPrice,
    };

    const mailData = {  
        currencyPair,
        alertType,
        price,
        indicator: 'SMA',  
        profitLoss: '-',
        ...allAlerts,
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



function calculateSMA(priceValues) {
    const { historicalPrices, currentPrice } = priceValues;
    const lastIndex = (historicalPrices.length - 1);
    const initIndex = lastIndex - parseInt(10);
    const priceArray = [];
    Object.keys(historicalPrices).forEach(key => {
    priceArray.push(historicalPrices[key]);
    });
    const smaValue = SMA.calculate({period : 10, values : priceArray });
    return smaValue[smaValue.length - 1];
}

module.exports = {
    sendSMAAlert,
    calculateSMA,
};
