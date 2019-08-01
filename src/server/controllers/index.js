const autoSignals = require('./auto-signals');
const currencyExchange = require('./currency-exchange');
const alerts = require('./alerts');
const expertSignals = require('./expert-signals');

module.exports = (app) => {
    const controllersArray = [autoSignals, currencyExchange, alerts, expertSignals];
    controllersArray.forEach((data) => {
        for(let method in data){
          for(let controller in data[method]){
            app[method](data[method][controller].url,data[method][controller].callback)
          }
        }
    });
}