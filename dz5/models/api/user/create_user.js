const db = require('../../index').getSequelize();

module.exports = (data) => {
  try{
    const dataUser = {
      user: data.username,
      password: data.password,
      img: data.img,
      permission: JSON.stringify(data.permission)
    }

    console.log('CREATE USER dbObj model = ', db.models.user);
  
    db.models.user.create(dataUser, { include: [{ all: true }] });
  } catch (error) {
    console.error('CREATE USER error: ', error);
  }
}
