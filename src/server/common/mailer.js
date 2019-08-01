const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'udaypydi333@gmail.com',
      pass: 'dupkhotwvolgdgla'
    }
}));


const generateMailPasswords = (config) => ({
    from: 'udaypydi333@gmail.com',
    to: ['udaypydi333@gmail.com', 'mail@adithyan.in'],
    subject: 'Signalant Alerts',
    text: `Hey Adityan, 
            Here is the ${config.alertType} alert.
            SMA - ${config.smaValue}
            CurrentValue - ${config.currentValue}
            The graph is moving ${config.graphDirection}. So you can ${config.alertType}
        `,
});

const sendAlerts = (config) => {
    transporter.sendMail(generateMailPasswords(config), function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};

module.exports = {
    sendAlerts,
};

