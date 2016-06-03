'use strict';

const path = require('path');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const winston = require('winston');

const app = express();
const PRODUCTION = (app.get('env') === 'production');

// logger
if (!PRODUCTION) {
  app.use(morgan('dev'));
}

const loggerOptions = {
  console: {
    level: 'info',
    colorize: true,
    label: 'app',
  }
};

if (!PRODUCTION) {
  loggerOptions.console.level = 'debug';
}

winston.loggers.add('root', loggerOptions);
const logger = winston.loggers.get('root');
logger.cli();

// DB connection
const mongoose = require('mongoose');
//mongoose.Promise = global.Promise; // use ES6 native promise for .catch

const dbName = 'app';
let mongoUri = null;
if (process.env.MONGODB_LOCAL)
  mongoUri = 'mongodb://localhost/';
else if (process.env.MONGODB_PORT)
  mongoUri = 'mongodb://mongodb/';
if (mongoUri)
  mongoose.connect(mongoUri + dbName);

app.set('port', process.env.PORT || 3000);

// static serving
if (process.env.STATIC != 'static/dist' || !PRODUCTION)
  app.use('/static', express.static(path.join(__dirname, 'static/dist')));

// view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (!PRODUCTION)
  app.disable('view cache');

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router settings
const rootRouter = require('./routers/root');
app.use(rootRouter);

// error logging
app.use((err, req, res, next) => {
  logger.error(err.stack);
  next(err);
});

// create server instance
const server = http.createServer(app);
server.listen(app.get('port'), () => {
  logger.info(`Server started at: http://localhost:${app.get('port')}`);
});

// socket.io
const io = require('socket.io')(server);

exports.exit = (cb) => {
  logger.info('exiting...');
  server.close(() => {
    logger.info('done.');
    cb();
  });
}
