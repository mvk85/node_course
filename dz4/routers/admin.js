const koaBody = require('koa-body');
const KoaRouter = require('koa-router');

const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const db = require('../models/db');

const router = new KoaRouter({
  prefix: '/admin'
});

router.get('/', function(ctx) {
  const skills = db.get('skills').value();

  ctx.body = ctx.app.pug.render('pages/admin', { skills });
});

// router.post('/', function(req, res, next) {
//   const skills = db.get('skills').value();

//   let form = new formidable.IncomingForm();
//   let upload = path.join('./public', 'upload');
//   let fileName;

//   if (!fs.existsSync(upload)) {
//     fs.mkdirSync(upload);
//   }

//   form.uploadDir = path.join(process.cwd(), upload);

//   form.parse(req, function (err, fields, files) {
//     if (err) {
//       return next(err);
//     }
//     const {form: formFied} = fields;

//     /** простая форма для записи скилов */
//     if (formFied === 'skills') {
//       const {
//         age,
//         concerts,
//         cities,
//         years
//       } = fields;

//       if (!age || !concerts || !cities || !years) {
//         return res.redirect('/admin');
//       }
  
//       const newSkills = {
//         age,
//         concerts,
//         cities,
//         years
//       };
  
//       db.set('skills', newSkills).write();
//       res.render('pages/admin', { skills: newSkills });  

//       /** Форма для загрузки фоток */
//     } else if (formFied === 'upload') {
//       const {
//         name,
//         price
//       } = fields;
    
//       if (!files.photo || files.photo.name === '' || files.photo.size === 0) {
//         return res.render('pages/admin', {
//           skills,
//           msgfile: 'Не загружена картинка!'
//         });
//       }
    
//       if (!name || !price) {
//         fs.unlink(files.photo.path);
//         return res.render('pages/admin', {
//           skills,
//           msgfile: 'Не заполнены поля!'
//         });
//       }
  
//       fileName = path.join(upload, files.photo.name);
    
//       fs.rename(files.photo.path, fileName, function (err) {
//         if (err) {
//           console.error(err);
//           fs.unlink(fileName);
//           fs.rename(files.photo.path, fileName);
//         }
//         let dir = fileName.substr(fileName.indexOf('\\'));  
//         db.get('upload')
//           .push({
//             src: dir,
//             name,
//             price
//           })
//           .write();  
 
//         return res.render('pages/admin', {
//           skills,
//           msgfile: 'Картинка успешно загружена!'
//         });
//       });  
//     }
//   });
// });

module.exports = router;