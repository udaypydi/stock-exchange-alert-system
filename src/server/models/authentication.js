import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt-nodejs';
const { mongoconnection } = require('../config/mongoconnection');
const { config } = require('../config');

let database  ;

MongoClient.connect('mongodb://localhost:27017/signalant', (err, db) => {
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
              database.collection('cart').findOne({ email: req.session.user.email }, (err, data) => {
                  console.log(data);
                res.json({ email: JSON.parse(user.session).user.email, isLoggedIn: true });
              })
            } else {
               res.json({ email: '', isLoggedIn: false });
            }
          });
    },
    encryptPassword: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(5), null),

    decryptPassword: (password, actualPassword) => bcrypt.compareSync(password, actualPassword),
};
