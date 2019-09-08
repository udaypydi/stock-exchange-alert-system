const alerts = require('../models/alerts');

module.exports = {
    get: [
        {
            url: '/get-alerts',
            callback: (req, res) => {
                alerts.getAllAlerts(req, res);
            }
        },
        {
            url: '/get-expert-alerts',
            callback: (req, res) => {
                alerts.getExpertAlerts(req, res);
            }
        },
        {
            url: '/get-alerts-count',
            callback: (req, res) => {
                alerts.getAlertCount(req, res);
            }
        },
        {
            url: '/get-all-alerts-data',
            callback: (req, res) => {
                alerts.getAllAlertsData(req, res);
            }
        }
    ],
};
