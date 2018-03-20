const {
  getProducts,
  getSkills
} = require('../../models/db');

const getMainPage = ctx => {
  ctx.set('Content-Type', 'text/html');
  const products = getProducts();
  const skills = getSkills();
  ctx.body = ctx.app.pug.render('pages/index', { products, skills });
};

module.exports = getMainPage;