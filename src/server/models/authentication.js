const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt-nodejs');
const cloudinary = require('cloudinary').v2;
const { mongoconnection } = require('../config/mongoconnection');
const config = require('../config/config');

let database  ;

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

module.exports = {

    getUser: (req, res) => {
        database.collection('session').findOne({ _id: req.sessionID }, (err, user) => {
            if (user) {
                console.log(user);
                database.collection('alerts').find({ email: JSON.parse(user.session).user.email }).toArray((err, result) => {
                  database.collection('users').find({ email: req.session.user.email}).toArray((error, userData) => {
                    console.log(userData[0].location);
                    res.json({ 
                      email: JSON.parse(user.session).user.email, 
                      isLoggedIn: true, 
                      followers: JSON.parse(user.session).user.followers,
                      following: JSON.parse(user.session).user.following,
                      name: JSON.parse(user.session).user.name,
                      alerts: result,
                      profile_pic: userData[0].profile_pic,
                      banner_url: userData[0].banner_url,
                      active_graphs: userData[0].activeGraphs,
                      phoneNumber: userData[0].phoneNumber,
                      location: userData[0].location,
                    });
                  });
                })
                
            } else {
               res.json({ email: '', isLoggedIn: false });
            }
          });
    },

    uploadProfilePic: (req, res) => {
      cloudinary.config({ 
        cloud_name: 'dgvup74b7', 
        api_key: '612874781655837', 
        api_secret: 'BU44RBDQB1U4uc7FCbf5gqno0Jg' 
      });
      
      cloudinary.uploader.upload(req.body.data, function(error, result) { 
        console.log('image uplaoded. secure url =', result.secure_url);
        let updatedData = {};
        if (req.body.imageUploadType === 'profile') {
          updatedData = { profile_pic: result.secure_url };
        } else {
          updatedData = { banner_url: result.secure_url };
        }

        database.collection('users').updateOne({ email: req.session.user.email }, { $set: updatedData});
        res.json({ profile_pic: result.secure_url });
       });
    },

    addCurrencyPair: (req, res) => {
      const updatedData = { activeGraphs: req.body };
      database.collection('users').updateOne({ email: req.session.user.email }, { $set: updatedData });
      res.json({ status: 200, active_graphs: req.body });
    },

    updateUserData: (req, res) => {
      const userData = {
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
      };
      database.collection('users').updateOne({ email: req.session.user.email }, { $set: userData });
      res.json({ status: 200, statusText: 'OK' });
    },

    encryptPassword: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(5), null),

    decryptPassword: (password, actualPassword) => bcrypt.compareSync(password, actualPassword),
};
