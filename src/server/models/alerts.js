const { mongoconnection } = require('../config/mongoconnection');

module.exports = {
    getAllAlerts: (req, res) => {
        mongoconnection.dbInstance((db) => {
            const database = db.db('signalant');
            database.collection('alerts').find({}).toArray((err, result) => {
                if (err) throw err;
                res.json({ status: 200, alerts: result });
            });
        })
    }
}