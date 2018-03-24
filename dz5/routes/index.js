const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('*', function(req, res) {
  res.send(fs.readFileSync(path.resolve(path.join('public', 'index.html')), 'utf8'));
});

module.exports = router;
