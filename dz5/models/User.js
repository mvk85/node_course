module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.STRING
    },
    permission: {
      type: DataTypes.STRING
    }
  })

  return User;
}