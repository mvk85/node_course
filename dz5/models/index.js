const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const dbConfig = require('../config/db');

const {
  name,
  user,
  pass,
  config
} = dbConfig;

function getSequelize() {
  const sequelize = new Sequelize(
    name,
    user,
    pass,
    config
  );

  sequelize.sync();
  sequelize.authenticate()
      .then(() => {
        console.log('Connect db success');
      })
      .catch((error) => {
        console.log('Error db connect, error = ', error);
      })

  return sequelize;
}

function initDB() {
  const sequelize = getSequelize();

  fs
  	.readdirSync('./models')
  	.filter(function(file) {
   	  return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "api");
 	  })
 	  .forEach(function(file) {
      console.log("FILE obj = ", file);
 	    sequelize.import(path.join(__dirname, file));
 	  });
 
	Object.keys(sequelize.models).forEach(function(modelName) {
	    if ("associate" in sequelize.models[modelName]) {
	        sequelize.models[modelName].associate(sequelize);
	    }
	});
}

module.exports = {
  getSequelize,
  initDB
};