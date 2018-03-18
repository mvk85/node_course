const koaBody = require('koa-body');
const KoaRouter = require('koa-router');

const getMainPage = require('./main/get-main-page');
const postMainPage = require('./main/post-main-page');
const getAdminPage = require('./admin/get-admin-page');
const postAdminPage = require('./admin/post-admin-page');
const getLoginPage = require('./login/get-login-page');

const router = new KoaRouter();

router.get('/', getMainPage);
router.post(
  '/',
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: './public/uploads'
    }
  }),
  postMainPage
);
router.get('/admin', getAdminPage);
router.post(
  '/admin',
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: './public/uploads'
    }
  }),
  postAdminPage
);
router.get('/login', getLoginPage);

module.exports = router;