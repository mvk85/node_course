const nodemailer = require('nodemailer');
const config = require('../config/mail.json');

function sendMail(params) {
  return new Promise((resolve, reject) => {
    const { name, email, message } = params;
    const transporter = nodemailer.createTransport(config.mail.smtp);
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: config.mail.smtp.auth.user,
      subject: config.mail.subject,
      text: message.trim().slice(0, 500) + `\n Отправлено с: <${email}>`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
}

module.exports = sendMail;