const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

module.exports.middleware = (app,express) => {
    app.use(cors());
    app.use(bodyParser.json({limit: '15mb'}));
    app.use(bodyParser.urlencoded({extended: true,limit: '15mb'}));
}


