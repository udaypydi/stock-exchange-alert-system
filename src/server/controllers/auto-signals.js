const autoSignals = require('../models/auto-signals');

module.exports = {
    get: [
        {
            url: '/get-auto-signals',
            callback: (req, res) => {
                autoSignals.getAutoSignals(req, res);
            }
        },
        {
            url: '/delete-auto-signal',
            callback: (req, res) => {
                autoSignals.deleteAutoSignal(req, res);
            }
        }
    ],
    post: [
        {
            url: '/create-auto-signal',
            callback: (req, res) => {
                autoSignals.createAutoSignal(req, res);
            }
        }
    ]
};
