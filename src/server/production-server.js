const express = require('express');
const fetch = require('node-fetch');
const ForgeClient = require("forex-quotes").default;
let client = new ForgeClient('uD3ghInLCfnn7gsSKAwV3D1nnp1X55x8');
const { mongoconnection } = require('./config/mongoconnection');

const moment = require('moment');
const SMA = require('technicalindicators').SMA;
const middleware = require('./common/middleware');
const { config } = require('./config');
const controllers = require('./controllers');
const cron = require('node-cron');

const app = express();
let database;

mongoconnection.dbInstance((db) => {
  database = db.db('signalant');
});


middleware.middleware(app, express);
controllers(app);

app.use(express.static('../../public'));
app.locals.priceValues = {
  USDJPY: {},
  XAUUSD: {},
  XAGUSD: {},
  EURUSD: {},
  GBPUSD: {},
  AUDUSD: {},
  NZDUSD: {},
  USDCAD: {},
  USDCHF: {},
  EURGBP: {},
  EURCHF: {},
  EURJPY: {},
  AUDNZD: {},
  USDGYD: {},
};

client.connect();

client.onUpdate((symbol, data) => {
  const { priceValues } = app.locals;
  const time = moment.unix(data.timestamp).format('MMMM Do YYYY, h:mm a');
  if (priceValues[symbol].historicalPrices) {
    priceValues[symbol].historicalPrices[time] = data.price;
  } else {
    priceValues[symbol].historicalPrices = {
      [time] : data.price
    };
  }
  priceValues[symbol].currentPrice = data.price;
});

// Handle non-price update messages
client.onMessage((message) => {
  console.log(message);
});

// Handle disconnection from the server
client.onDisconnect(() => {
  console.log("Disconnected from server");
});

// Handle successful connection
client.onConnect(() => {

  database.collection('currency_exchange').find({}).toArray((err, result) => {
    app.locals.priceValues = result[0].priceValues;
  })

  // Subscribe to an array of currency pairs
  client.subscribeTo([
      'USDJPY',
      'XAUUSD',
      'XAGUSD',
      'EURUSD',
      'GBPUSD',
      'AUDUSD',
      'NZDUSD',
      'USDCAD',
      'USDCHF',
      'EURGBP',
      'EURCHF',
      'EURJPY'
  ]);

  cron.schedule('*/1 * * * *', () => {
    database.collection('currency_exchange').update({}, { $set: { priceValues: app.locals.priceValues } }, { upsert: true });
  }).start();

  // cron.schedule('*/1 * * * *', () => {
  //   const prices = app.locals.priceValues['USDJPY'];
  //   const { historicalPrices, currentPrice } = prices;
  //   const lastIndex = (historicalPrices.length - 1);
  //   const initIndex = lastIndex - parseInt(10);
  //   const priceArray = [];
  //   Object.keys(historicalPrices).forEach(key => {
  //     priceArray.push(historicalPrices[key]);
  //   });
  //   const sma = SMA.calculate({period : 10, values : priceArray });
  //   console.log(sma[sma.length - 1], currentPrice);
  // }).start();

  app.listen(config.development.port, () => {
    console.log('started on port:', config.development.port);
  });
});

// cron.schedule('*/1 * * * * *', () => {
//   const { priceValues } = app.locals;

//       fetch('https://api.1forge.com/convert?from=EUR&to=USD&quantity=1&api_key=uD3ghInLCfnn7gsSKAwV3D1nnp1X55x8')
//         .then(res => res.json())
//         .then(json => {
//             if (priceValues['EURUSD'].historicalPrices) {
//                 if (priceValues['EURUSD'].historicalPrices.length > 200) {
//                     priceValues['EURUSD'].historicalPrices.shift();
//                 }
//                 priceValues['EURUSD'].historicalPrices.push(json.value);
//             } else {
//                 priceValues['EURUSD'].historicalPrices = [json.value];
//             }
//             priceValues['EURUSD'].currentPrice = json.value;
//         })
//         .catch(err => {
//           console.error(err);
//         });
// }).start();


// cron.schedule('*/1 * * * * *', () => {
//   fetch(`https://frankfurter.app/latest?from=EUR&to=USD`)
//     .then(res => res.json())
//     .then(json => {
//       console.log(json);
//     })
//     .catch(err => {
//       console.log(err);
//     })
// }).start();
