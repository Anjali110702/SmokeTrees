'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Address, {
      foreignKey: 'UserId',
      as: 'addresses',
    });
  };
  return User;
};
