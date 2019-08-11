const currencyExchange = require('../models/currency-exchange');

module.exports = {
    get: [
        {
            url: '/get-exchange-rates',
            callback: (req, res) => {
                currencyExchange.getCurrencyExchange(req, res);
            }
        }
    ]
};
