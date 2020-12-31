 'use strict';
 const {Model} = require('sequelize');

 const { sequelize } = require(".");

 module.exports = (sequelize, DataTypes) => {
   class User extends Model {
     /**
      * Helper method for defining associations.
      * This method is not a part of Sequelize lifecycle.
      * The `models/index` file will call this method automatically.
      */
     static associate(models) {
      User.hasMany(models.diary, {
        foreignKey: "id",
      });
      User.hasMany(models.question, {
        foreignKey : "id",
      });
      User.hasMany(models.like, {
        foreignKey : "id",
      });
    }
  };
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
