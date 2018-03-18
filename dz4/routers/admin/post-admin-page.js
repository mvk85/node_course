const fs = require('fs');
const path = require('path');
const {
  getSkills,
  setSkills,
  setFileParams
} = require('../../models/db');

function postAdminPage(ctx) {
  const skills = getSkills();
  const body = ctx.request.body;
  const fields = body.fields;
  const files = body.files;  
  const form = fields ? fields.form : body.form;
  const isFormSkills = form === 'skills';
  const isFormUpload = form === 'upload';
  let fileName;  

  if (isFormSkills) {
    const {
      age,
      concerts,
      cities,
      years
    } = body;

    if (!age || !concerts || !cities || !years) {
      return ctx.redirect('/admin');
    }

    const newSkills = {
      age,
      concerts,
      cities,
      years
    };

    setSkills(newSkills);
    ctx.body = ctx.app.pug.render('pages/admin', { skills: newSkills });  

    /** Форма для загрузки фоток */
  } else if (isFormUpload) {
    const {
      name,
      price
    } = fields;
    const upload = path.join('./public', 'uploads');
  
    if (!files.photo || files.photo.name === '' || files.photo.size === 0) {
      return ctx.body = ctx.app.pug.render('pages/admin', {
        skills,
        msgfile: 'Не загружена картинка!'
      });
    }
  
    if (!name || !price) {
      fs.unlink(files.photo.path);
      return ctx.body = ctx.app.pug.render('pages/admin', {
        skills,
        msgfile: 'Не заполнены поля!'
      });
    }

    fileName = path.join(upload, files.photo.name);
  
    try {
      const dir = fileName.substr(fileName.indexOf('\\'));  

      fs.renameSync(files.photo.path, fileName);
      setFileParams({
        src: dir,
        name,
        price
      });
  
      return ctx.body = ctx.app.pug.render('pages/admin', { skills, msgfile: 'Картинка успешно загружена!' });
    } catch (error) {
      console.error('error rename = ', error);      
      fs.unlinkSync(files.photo.path);

      return ctx.body = ctx.app.pug.render('pages/admin', {
        skills,
        msgfile: `Системная ошибка записи: ${error}`
      });
    }
  }
}

module.exports = postAdminPage;