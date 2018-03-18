function postLoginPage(ctx) {  
  const { email, password } = ctx.request.body;  
  const EMAIL = 'admin@admin.ru';
  const PASSWORD = '123';
  
  if (!email || !password) {
    return ctx.body = ctx.app.pug.render('pages/login', { msgslogin: 'Не заполнен логин или пароль'});
  }
  
  if (email !== EMAIL || String(password) !== PASSWORD) {
    return ctx.body = ctx.app.pug.render('pages/login', { msgslogin: 'Не верный логин или пароль'});
  }
  
  ctx.redirect('/admin');
}

module.exports = postLoginPage;