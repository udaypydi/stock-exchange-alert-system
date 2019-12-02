
const fetch = require('node-fetch');
const { mongoconnection } = require('../config/mongoconnection');

let database;

mongoconnection.dbInstance((db) => {
    database = db.db('signalant');
});

module.exports = {
    getCurrencyExchange: (req, res) => {
        database.collection('users').find({ email: req.session.user.email }).toArray((err, result) => {
            console.log(result);
            if (result.length) {  
                const { activeGraphs } = result[0];
                const graphs = activeGraphs.map(graph => graph.currency);
                console.log(graphs);
                const priceValues = req.app.locals.priceValues;

                const currencyExchange = graphs.map((currency, index) => {
                    const keys = Object.keys(priceValues[currency.trim()].historicalPrices).slice(0, 9);
                    const prices = {};
                    keys.forEach(key => {
                        prices[key] = priceValues[currency.trim()].historicalPrices[key];
                    });

                    return { 
                        historicalData: prices, 
                        currentPrice: req.app.locals.priceValues[currency.trim()].currentPrice, 
                        currencyPair: currency.trim(),
                        graphStyle: activeGraphs[index].graphStyle
                    }
                
                });
                res.json({ status: 200, currencyExchange });
            } else {
                res.json({ status: 200, currencyExchange: [] });
            }
        });
    },

    deleteCurrencyPair: (req, res) => {
        const delete_index = req.query.currencypair;
        // const updatedData = { activeGraphs: req.body };
        // database.collection('users').updateOne({ email: req.session.user.email }, { $set: updatedData });
        // res.json({ status: 200, active_graphs: req.body });
        database.collection('users').find({ email: req.session.user.email }).toArray((err, result) => {
            result[0].activeGraphs.splice(delete_index, 1);
            database.collection('users').updateOne({ email: req.session.user.email }, { $set: { activeGraphs: result[0].activeGraphs } });
            res.json({ status: 200, statusText: 'OK' });
        });
    }
}