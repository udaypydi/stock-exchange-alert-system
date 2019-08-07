const experts = require('../models/expert-signals');

module.exports = {
    post: [
        {
            url: '/create-expert-signals',
            callback: (req, res) => {
                experts.createExpertSignal(req, res);
            }
        },
        {
            url: '/follow-unfollow-expert',
            callback: (req, res) => {
                experts.followUnfollowExperts(req, res);
            }
        }
    ],

    get: [
        {
            url: '/fetch-experts',
            callback: (req, res) => {
                experts.fetchExperts(req, res);
            }
        }
    ]
};
