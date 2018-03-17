const db = require('../../models/db');

function getAdminPage(ctx) {
  const skills = db.get('skills').value();

  ctx.body = ctx.app.pug.render('pages/admin', { skills });
}

module.exports = getAdminPage;