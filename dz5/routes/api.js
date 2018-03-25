const express = require('express');
const DB = require('../models');
const saveNewUser = require('../controllers/user/save_new_user');

DB.initDB();

const router = express.Router();

router.post('/saveNewUser', saveNewUser);

module.exports = router;
