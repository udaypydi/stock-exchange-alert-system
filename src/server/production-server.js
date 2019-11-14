const express = require('express');
const middleware = require('./common/middleware');
const { config } = require('./config');
const controllers = require('./controllers');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.sockets.on('connection', function (socket) {
  socket.on('join', function (data) {
    console.log(data.email, 'joined');
    socket.join(data.email); // We are using room of socket io
  });
});

app.locals.io = io;

middleware.middleware(app, express);
controllers(app);

app.use(express.static('../../public'));

http.listen(config.development.port, () => {
    console.log('started on port:', config.development.port);
  });
  