function getLoginPage(ctx) {
  ctx.body = ctx.app.pug.render('pages/login');
}

module.exports = getLoginPage;