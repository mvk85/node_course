const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');

const index = require('./routes/index');
const api = require('./routes/api');

const app = express();

app.use(bodyParser.json({type: 'text/plain'}));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
