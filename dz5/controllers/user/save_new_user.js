const createUser = require('../../models/api/user/create_user');

module.exports = (req, res) => {
  console.log('req.params body = ', req.body);
  const userDataReg = req.body;

  createUser(userDataReg);
    
  res.end()
}

/*

{ 
  username: 'test',
  password: '123',
  img: '',
  permission:
  {
     chat: { C: false, R: true, U: true, D: false },
     news: { C: false, R: true, U: false, D: false },
     setting: { C: false, R: false, U: false, D: false }
  } 
}
*/