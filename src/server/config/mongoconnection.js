const { MongoClient } = require('mongodb');
const config = require('./config');

const mongoconnection = {
  createConnection: (modelName = 'alerts') => {
    MongoClient.connect(config.development.mongourl, (err, db) => {
      if (err)
        throw err
      else {
      const database = db.db('signalant');
      database.listCollections({name: modelName})
      .next((err, collinfo) => {
          if (!collinfo) {
              database.createCollection(modelName);
          }
      });
      return database;
    }
    });
  },

  dbInstance: (callback) => {
    MongoClient.connect(config.development.mongourl, (err, db) => {
      return callback(db);
    });
  }
}
module.exports = {
    mongoconnection,
};
