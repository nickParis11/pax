'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    // associations can be defined here
    Users.belongsTo(models.textAnalyzer, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
  return Users;
};