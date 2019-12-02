const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();
const config = require('../config/config')

const MongoStore =  require ('connect-mongo')(session);



module.exports.middleware = (app,express) => {
    app.use(cors());
    app.use(bodyParser.json({limit: '15mb'}));
    app.use(bodyParser.urlencoded({extended: true,limit: '15mb'}));
    app.use(cookieParser('signalant'));
	app.use(session({ 
		secret: 'signalant', 
		resave: false, 
		saveUninitialized: false,
		store: new MongoStore({
				url: config.development.mongourl,
				collection: 'session',
		 }),
		autoRemove: 'native'
	}));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	app.use((req, res, next) => {
		res.locals.login = req.isAuthenticated(),
		res.locals.session = req.session;
		next();
    });
    
    app.use('/', (req, res, next) => {
		console.log(new Date(), req.sessionID);
		next();
    });
}


