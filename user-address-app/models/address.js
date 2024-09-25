'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    address: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Address.associate = function(models) {
    Address.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'user',
    });
  };
  return Address;
};
