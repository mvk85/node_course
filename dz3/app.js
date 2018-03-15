const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routers/index');
const admin = require('./routers/admin');
const login = require('./routers/login');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', index);
app.use('/login', login);
app.use('/admin', admin);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
  next();
});

module.exports = app;