const koaBody = require('koa-body');
const KoaRouter = require('koa-router');

// const nodemailer = require('nodemailer');
// const config = require('../config.json');
// const db = require('../models/db');

const getMainPage = require('./main/get-main-page');
const postMainPage = require('./main/post-main-page');
const getAdminPage = require('./admin/get-admin-page');
const getLoginPage = require('./login/get-login-page');

const router = new KoaRouter();

router.get('/', getMainPage);
router.post('/', koaBody({
  multipart: true,
  formidable: {
    uploadDir: './uploads',
    onFileBegin: () => {
      console.log('FILEBEGIN!!!')
    }
  }
}), postMainPage);
router.get('/admin', getAdminPage);
router.get('/login', getLoginPage);

// router.get('/', function(req, res, next) {
//   const products = db.get('upload').value();
//   const skills = db.get('skills').value();
//   const {
//     age,
//     concerts,
//     cities,
//     years
//   } = skills;
//   const arSkills = [
//     {
//       'number': age,
//       'text': 'Возраст начала занятий на скрипке'
//     },
//     {
//       'number': concerts,
//       'text': 'Концертов отыграл'
//     },
//     {
//       'number': cities,
//       'text': 'Максимальное число городов в туре'
//     },
//     {
//       'number': years,
//       'text': 'Лет на сцене в качестве скрипача'
//     }
//   ];
//   res.render('pages/index', { products, skills: arSkills });
//   next();
// });

// router.post('/', function(req, res) {
//   const bodyForm = req.body;
//   const { name, email, message } = bodyForm;

//   if (!name || !email || !message) {
//     return res.render('pages/index', {msgemail: 'Заполните все поля'});
//   }
  
//   const transporter = nodemailer.createTransport(config.mail.smtp);
//   const mailOptions = {
//     from: `"${req.body.name}" <${req.body.email}>`,
//     to: config.mail.smtp.auth.user,
//     subject: config.mail.subject,
//     text:
//       req.body.message.trim().slice(0, 500) +
//       `\n Отправлено с: <${req.body.email}>`
//   };
//   transporter.sendMail(mailOptions, function(error) {
//     if (error) {
//       return res.render('pages/index', {msgemail: `При отправке письма произошла ошибка!: ${error}`});
//     }

//     res.render('pages/index', {msgemail: 'форма успешно отправлена'});
//   });
// });

module.exports = router;