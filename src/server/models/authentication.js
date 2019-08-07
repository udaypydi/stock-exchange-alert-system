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
                res.json({ 
                  email: JSON.parse(user.session).user.email, 
                  isLoggedIn: true, 
                  following: JSON.parse(user.session).user.following,
                  name: JSON.parse(user.session).user.name
                });
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
        database.collection('users').update({ email: req.session.user.email }, { $set: { profile_pic: result.secure_url }}, { upsert: true });
        res.json({ profile_pic: result.secure_url });
       });
    },

    encryptPassword: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(5), null),

    decryptPassword: (password, actualPassword) => bcrypt.compareSync(password, actualPassword),
};
