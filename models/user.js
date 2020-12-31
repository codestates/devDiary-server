 'use strict';
 const {Model} = require('sequelize');
 module.exports = (sequelize, DataTypes) => {
   class User extends Model {
     /**
      * Helper method for defining associations.
      * This method is not a part of Sequelize lifecycle.
      * The `models/index` file will call this method automatically.
      */
     static associate(models) {
      models.User.hasMany(models.diary, {
        foreignKey: "writer",
      });
      models.User.hasMany(models.question, {
        foreignKey : "writer",
      });
      models.User.hasMany(models.like, {
        foreignKey : "id"
      });
    }



  };
  User.init({
    email: DataTypes.STRING,
    username: {unique: true,
    type : DataTypes.STRING,
    allowNull: false,},
    password: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
