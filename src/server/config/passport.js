const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { MongoClient } = require('mongodb');
const { authentication } = require('../models');
const config  = require('../config/config');
let database;

MongoClient.connect(config.development.mongourl, (err, db) => {
    if (err)
      throw err
    else {
     database = db.db('signalant');
     database.listCollections({name: 'users'})
     .next((err, collinfo) => {
         if (!collinfo) {
            database.createCollection('users');
         }
     });
   }
});

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((id, done) => {
    database.collection('users').findOne({ _id: id }, (err, user) => {
      done(err, user.email);
    })
  });
  

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, phoneNumber, password, done) => {
    database.collection('users').findOne({ 'email': req.body.email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null ,false, { message: 'Email already in use' });
      }
      var newUser = {};
      newUser.name = req.body.userName;
      newUser.email = req.body.email;
      newUser.password = authentication.encryptPassword(req.body.password);
      newUser.created_at = new Date();
      newUser.is_expert = false;
      newUser.followers = [];
      newUser.following = [];
      newUser.success_ratio = 0;
      newUser.user_role = 'trader';
      newUser.profile_pic = '';
      newUser.activeGraphs = [
        {
          currency: 'EURUSD',
          graphStyle: 'GRAPH_0',
        },
        {
          currency: 'USDJPY',
          graphStyle: 'GRAPH_1',
        },
        { 
          currency: 'USDGYD',
          graphStyle: 'GRAPH_2',
        }, 
        {
          currency: 'AUDNZD',
          graphStyle: 'GRAPH_3',
        }];
      database.collection('users').insert(newUser, (err, result) => {
        if (err) {
          return done(err);
        }
        req.session.user = { ...newUser };
        newUser.sessionID = req.sessionID;
        return done(null, newUser);
      });
    })
  }));
  


  passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, phoneNumber, password, done) => {
      database.collection('users').findOne({ 'email': req.body.email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null ,false, { message: 'No user found.' });
        }
  
        if (!authentication.decryptPassword(password, user.password)) {
          return done(null ,false, { message: 'Wrong Password.' });
        }
  
        req.session.user = user;
        user.sessionID = req.sessionID;
        return done(null ,user);
      })
  }));
