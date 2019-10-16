const passport = require('passport');
const { authentication } =  require('../models');

module.exports = {
    get: [
        {
            url: '/log-out-user',
            callback: (req, res) => {
              req.session.destroy();
              res.json({ status: 200 });
            }
        },

        {
            url: '/get-user',
            callback: (req, res) => {
                authentication.getUser(req, res);
            }
        },
    ],
    post: [
        {
            url: '/sign-in',
            callback: (req, res, next) => passport.authenticate('local.signin', (err, user, info) => {
                if (user) {
                    res.json({isLoggedin: true, message: 'Logged in succesfully', userId: req.session.user });
                }
                if (info) {
                res.json({isLoggedin: false, message: info.message});
                }
            })(req, res, next)
        },

        {
            url: '/sign-up',
            callback: (req, res, next) => passport.authenticate('local.signup', (err, user, info) => {
                console.log(user, info);
              if (user) {
                res.json({ isRegistered: true, isLoggedin: true, message: 'Registered succesfully', userId: req.session.user });
                // res.redirect('/');
              }
              if (info) {
                res.json({isRegistered: false, message: info.message});
              }
            })(req, res, next)
        },

        {
            url: '/update-user-profile',
            callback: (req, res) => {
                authentication.uploadProfilePic(req, res);
            }
        },
        {
            url: '/add-currency-pair',
            callback: (req, res) => {
                authentication.addCurrencyPair(req, res);
            }
        },
        {
            url: '/update-user-data',
            callback: (req, res) => {
                authentication.updateUserData(req, res);
            }
        },

        {
            url: '/generate-otp',
            callback: (req, res) => {
                authentication.generateOTP(req, res);
            }
        },

        {
            url: '/reset-password',
            callback: (req, res) => {
                authentication.resetPassword(req, res);
            }
        },

        {
            url: '/validate-otp',
            callback: (req, res) => {
                authentication.validateOTP(req, res);
            }
        },
        {
            url: '/reset-user-data',
            callback: (req, res, next) => passport.authenticate('local.forgotPassword', (err, user, info) => {
              if (user) {
                res.json({ passwordReset: true, isLoggedin: true, message: 'Registered succesfully', userId: req.session.user });
                // res.redirect('/');
              }
              if (info) {
                res.json({passwordReset: false, message: info.message});
              }
            })(req, res, next)
        },
      
    ]
}