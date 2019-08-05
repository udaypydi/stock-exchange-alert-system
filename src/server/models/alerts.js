const { mongoconnection } = require('../config/mongoconnection');

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
    }
}