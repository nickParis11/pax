'use strict';
module.exports = (sequelize, DataTypes) => {
  const textAnalyzer = sequelize.define('textAnalyzer', {
    title: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  })

  textAnalyzer.associate = (models) => {
    textAnalyzer.hasMany(models.Users, {
      foreignKey: 'userId',
      as: 'users',
    });
  }
  return textAnalyzer;
};