const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const router = require('./routers/index');
const middlewares = require('./middlewares');
const Pug = require('koa-pug');

middlewares.pug.app = app;
app.pug = new Pug(middlewares.pug);

app.use(serve('./public'));

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log('Listening on port = ' + port); // eslint-disable-line no-console
});
