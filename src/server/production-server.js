const express = require('express');
const middleware = require('./common/middleware');
const { config } = require('./config');
const controllers = require('./controllers');

const app = express();

middleware.middleware(app, express);
controllers(app);

app.use(express.static('../../public'));

app.listen(config.development.port, () => {
    console.log('started on port:', config.development.port);
  });
  