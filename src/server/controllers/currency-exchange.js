const currencyExchange = require('../models/currency-exchange');

module.exports = {
    get: [
        {
            url: '/create-auto-signals',
            callback: (req, res) => {
                currencyExchange.getCurrencyExchange(req, res);
            }
        }
    ]
};
