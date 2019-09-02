const { mongoconnection } = require('../config/mongoconnection');
const moment = require('moment');

let database;

mongoconnection.dbInstance((db) => {
    database = db.db('signalant');
});

module.exports = {
    getAllAlerts: (req, res) => {
        mongoconnection.dbInstance((db) => {
            const database = db.db('signalant');
            database.collection('alerts').find({ email: req.session.user.email }).toArray((err, result) => {
                if (err) throw err;
                res.json({ status: 200, alerts: result });
            });
        })
    },

    getExpertAlerts: (req, res) => {
        mongoconnection.dbInstance((db) => {
            const database = db.db('signalant');
            database.collection('expert_alerts').find({ email: req.session.user.email }).toArray((err, result) => {
                if (err) throw err;
                res.json({ status: 200, alerts: result });
            });
        })
    },

    getAlertCount: (req, res) => {
        database.collection('expert_alerts').find({ email: req.session.user.email }).toArray((err, expertAlerts) => {
            if (!err) {
                database.collection('price_alerts').find({ email: req.session.user.email }).toArray((err, priceAlerts) => {
                    if (!err) {
                        database.collection('alerts').find({ email: req.session.user.email }).toArray((err, alerts) => {
                            const alertsCount = [];
                            const alertsMap = {};

                            [...expertAlerts, ...priceAlerts, ...alerts].forEach(alert => {
                                if (!alertsMap[alert.created_at]) {
                                    alertsMap[alert.created_at] = [alert];
                                } else {
                                    alertsMap[alert.created_at] = [...alertsMap[alert.created_at], alert];
                                }
                            });

                            Object.keys(alertsMap).forEach(key => {
                                alertsCount.push({
                                    date: key,
                                    alerts: alertsMap[key].length,
                                });
                            });

                            res.json({ status: 200, alerts: alertsCount });
                        });
                    }
                });
            }
        });
    }
}