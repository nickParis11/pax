'use strict';
module.exports = (sequelize, DataTypes) => {
  var textAnalyzer = sequelize.define('textAnalyzer', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return textAnalyzer;
};