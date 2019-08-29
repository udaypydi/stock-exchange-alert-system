
const fetch = require('node-fetch');
const { mongoconnection } = require('../config/mongoconnection');

let database;

mongoconnection.dbInstance((db) => {
    database = db.db('signalant');
});

module.exports = {
    getCurrencyExchange: (req, res) => {


        database.collection('users').find({ email: req.session.user.email }).toArray((err, result) => {
            const { activeGraphs } = result[0];
            const graphs = activeGraphs.map(graph => graph.currency);
            const api_keys = ['QZ5AG7BLQD7TLXTZ', 'JJJLU0RT9LACJCYK', 'OUMK5GXJ8U10GOC0', 'QZ5AG7BLQD7TLXTZ'];
            const CURRENCY_EXCHANGE_RATE = graphs.map((currency, index) => {
                // return `https://api.exchangerate-api.com/v4/latest/${currency.split('').splice(0, 3).join('')}`;
                return `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${currency.split('').splice(0, 3).join('')}&to_symbol=${currency.split('').splice(3, 6).join('')}&apikey=${api_keys[index]}`;
            });

            Promise.all(CURRENCY_EXCHANGE_RATE.map(url =>
                fetch(url).then(res => res.json())
            )).then(json => {
                const formattedCurrency = json.map((data, index) => {
                    const exchangeData = data['Time Series FX (Daily)'];
                    const keys = Object.keys(exchangeData);
                    const formattedObject = [];
                    for (let index = 0; index <= 10; index++) {
                        formattedObject.push({
                            date: keys[index],
                            currencyValue: exchangeData[keys[index]]
                        });
                    }
                    return {
                        currencyData: formattedObject,
                        currencyName: activeGraphs[index].currency,
                        graphStyle: activeGraphs[index].graphStyle,
                    };
                });
                res.json({ status: 200, currencyExchange: formattedCurrency });
            }).catch(err => {
                console.log(err);
                res.json({ status: 500, reason: err });
            });
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