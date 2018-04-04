const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('*', function (req, res) {
  res.send(fs.readFileSync(path.resolve(path.join('public', 'index.html')), 'utf8'));
});

module.exports = router;
