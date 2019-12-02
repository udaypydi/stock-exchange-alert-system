
const moment = require('moment');
const cron = require('node-cron');
const mailer = require('nodemailer');
const EMA = require('technicalindicators').EMA;
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


function sendEMAAlert(alertData) {
    const { alert_id, currencyPair, indicator_value, price, buyPrice, sellPrice, alertType, allAlerts, email } = alertData;
    let alert = {
        currencyPair,
        indicator: 'EMA',
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
        indicator: 'EMA',  
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




function calculateEMA(priceValues, period) {
    const { historicalPrices, currentPrice } = priceValues;
    const lastIndex = (historicalPrices.length - 1);
    const initIndex = lastIndex - parseInt(period);
    const priceArray = [];
    Object.keys(historicalPrices).forEach(key => {
        priceArray.push(historicalPrices[key]);
    });
    if (priceArray.length >= parseInt(period)) {
        const emaValue = EMA.calculate({period : parseInt(period), values : priceArray });
        return emaValue[emaValue.length - 1];
    }
    return undefined;
}

module.exports = {
    calculateEMA,
    sendEMAAlert,
};
