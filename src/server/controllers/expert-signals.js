const experts = require('../models/expert-signals');

module.exports = {
    post: [
        {
            url: '/create-expert-signals',
            callback: (req, res) => {
                experts.createExpertSignal(req, res);
            }
        },
    ],
};
