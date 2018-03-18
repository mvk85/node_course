const sendMail = require('../../controllers/send-mail');
const {
  getProducts,
  getSkills
} = require('../../models/db');

async function postMainPage(ctx) {    
  const products = getProducts();
  const skills = getSkills();
  const { name, email, message } = ctx.request.body;

  ctx.set('Content-Type', 'text/html');

  if (!name || !email || !message) {
    ctx.body = ctx.app.pug.render('pages/index', { products, skills , msgemail: 'Заполните все поля'});
    
    return ctx.body;
  }

  try {
    await sendMail({name, email, message});

    ctx.body = ctx.app.pug.render('pages/index', { products, skills, msgemail: 'форма успешно отправлена'});    
  } catch (error) {
    ctx.body = ctx.app.pug.render('pages/index', {
      products,
      skills,
      msgemail: `При отправке письма произошла ошибка!: ${error}`
    });
  }
}

module.exports = postMainPage;