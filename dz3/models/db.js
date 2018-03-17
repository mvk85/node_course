const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, 'my-db.json'));
const db = low(adapter);

db.defaults(
  { 
    skills: {
      age: '0',
      concerts: '0',
      cities: '0',
      years: '0'
    },
    upload: []
  })
  .write();

module.exports = db;