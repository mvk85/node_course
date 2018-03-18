const {
  getSkills
} = require('../../models/db');

function getAdminPage(ctx) {
  const skills = getSkills();

  ctx.body = ctx.app.pug.render('pages/admin', { skills });
}

module.exports = getAdminPage;