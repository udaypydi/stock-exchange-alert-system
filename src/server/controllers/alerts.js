const alerts = require('../models/alerts');

module.exports = {
    get: [
        {
            url: '/get-alerts',
            callback: (req, res) => {
                alerts.getAllAlerts(req, res);
            }
        },
    ],
};
