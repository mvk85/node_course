const koaBody = require('koa-body');
const KoaRouter = require('koa-router');
const fs = require('fs');
const path = require('path');

const getMainPage = require('./main/get-main-page');
const postMainPage = require('./main/post-main-page');
const getAdminPage = require('./admin/get-admin-page');
const postAdminPage = require('./admin/post-admin-page');
const getLoginPage = require('./login/get-login-page');
const postLoginPage = require('./login/post-login-page');

const router = new KoaRouter();

const uploadPath = path.join('./public', 'uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

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
router.post('/login', koaBody(), postLoginPage);

module.exports = router;