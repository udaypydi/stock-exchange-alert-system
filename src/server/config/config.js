module.exports = {
    development: {
      port: process.env.PORT || 3000,
      mongourl: 'mongodb://localhost:27017/signalant',
      db: null
    },
  
    production: {
      port: process.env.PORT || 3000,
      mongourl:  'mongodb://localhost:27017/signalant',
      db: null
    }
  };
