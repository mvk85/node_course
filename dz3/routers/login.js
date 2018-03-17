const express = require('express');
const formidable = require('formidable');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('pages/login');
});

router.post('/', function(req, res) {
  let form = new formidable.IncomingForm();

  form.parse(req, function (err, fields) {
    const { email, password } = fields;  
    const EMAIL = 'admin@admin.ru';
    const PASSWORD = '123';
  
    if (!email || !password) {
      return res.render('pages/login', { msgslogin: 'Не заполнен логин или пароль'});
    }
  
    if (email !== EMAIL || String(password) !== PASSWORD) {
      return res.render('pages/login', { msgslogin: 'Не верный логин или пароль'});
    }
  
    res.redirect('/admin');
  });
});

module.exports = router;