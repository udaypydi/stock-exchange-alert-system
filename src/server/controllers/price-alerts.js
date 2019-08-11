const priceAlerts = require('../models/price-alerts');

module.exports = {
    get: [
        {
            url: '/get-price-alert-signals',
            callback: (req, res) => {
                priceAlerts.getPriceAlertSignals(req, res);
            }
        },
        {
            url: '/get-price-alerts',
            callback: (req, res) => {
                priceAlerts.getPriceAlerts(req, res);
            }
        }
    ],
    post: [
        {
            url: '/create-price-alerts',
            callback: (req, res) => {
                priceAlerts.createPriceAlerts(req, res);
            }
        }
    ]
}