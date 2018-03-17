const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config.json');
const db = require('../models/db');

router.get('/', function(req, res, next) {
  const products = db.get('upload').value();
  const skills = db.get('skills').value();
  const {
    age,
    concerts,
    cities,
    years
  } = skills;
  const arSkills = [
    {
      'number': age,
      'text': 'Возраст начала занятий на скрипке'
    },
    {
      'number': concerts,
      'text': 'Концертов отыграл'
    },
    {
      'number': cities,
      'text': 'Максимальное число городов в туре'
    },
    {
      'number': years,
      'text': 'Лет на сцене в качестве скрипача'
    }
  ];
  res.render('pages/index', { products, skills: arSkills });
  next();
});

router.post('/', function(req, res) {
  const bodyForm = req.body;
  const { name, email, message } = bodyForm;

  if (!name || !email || !message) {
    return res.render('pages/index', {msgemail: 'Заполните все поля'});
  }
  
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      req.body.message.trim().slice(0, 500) +
      `\n Отправлено с: <${req.body.email}>`
  };
  transporter.sendMail(mailOptions, function(error) {
    if (error) {
      return res.render('pages/index', {msgemail: `При отправке письма произошла ошибка!: ${error}`});
    }

    res.render('pages/index', {msgemail: 'форма успешно отправлена'});
  });
});

module.exports = router;