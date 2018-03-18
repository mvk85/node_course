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


const getProducts = () => db.get('upload').value();
const getSkills = () => db.get('skills').value();
const setSkills = (newSkills) => db.set('skills', newSkills).write();
/**
 * Set file params
 * @param {src, name, price} paramsFile - src - direcory path, name - name file, price - price from form
 */
const setFileParams = (paramsFile) => db.get('upload').push(paramsFile).write();

module.exports = {
  getProducts,
  getSkills,
  setSkills,
  setFileParams
};