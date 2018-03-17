const nodemailer = require('nodemailer');
const config = require('../../config/mail.json');const {
  getProducts,
  getSkills
} = require('../../models/db');
const util = require('util');

function postMainPage(ctx) {  
  // ctx.set('Content-Type', 'text/html');
  const products = getProducts();
  const skills = getSkills();

  const bodyForm = ctx.request.body;
  const { name, email, message } = bodyForm;

  console.log('form = ', bodyForm);

  if (!name || !email || !message) {
    ctx.body = ctx.app.pug.render('pages/index', { products, skills , msgemail: 'Заполните все поля'});
    return ctx.body;
  }
  
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: message.trim().slice(0, 500) + `\n Отправлено с: <${email}>`
  };
  // console.log('options = ', mailOptions);
  // const sendMail = util.promisify(transporter.sendMail);

  // const responseMail = await sendMail(mailOptions);

  // console.log('responseMail = ', responseMail);

  // if (responseMail) {
  //   ctx.body = ctx.app.pug.render('pages/index', { products, skills, msgemail: `При отправке письма произошла ошибка!: ${error}`});
      
  //   return ctx.body;
  // }

  // ctx.body = ctx.app.pug.render('pages/index', { products, skills, msgemail: 'форма успешно отправлена'});


  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      ctx.body = ctx.app.pug.render('pages/index', { products, skills, msgemail: `При отправке письма произошла ошибка!: ${error}`});
      
      return ctx.body;
    }

    ctx.body = ctx.app.pug.render('pages/index', { products, skills, msgemail: 'форма успешно отправлена'});

    return ctx.body;
  });
}

module.exports = postMainPage;