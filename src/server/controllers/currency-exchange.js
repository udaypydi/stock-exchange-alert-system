const currencyExchange = require('../models/currency-exchange');

module.exports = {
    get: [
        {
            url: '/get-exchange-rates',
            callback: (req, res) => {
                currencyExchange.getCurrencyExchange(req, res);
            }
        },
        {
            url: '/delete-currency-pair',
            callback: (req, res) => {
                currencyExchange.deleteCurrencyPair(req, res);
            }
        }
    ]
};
