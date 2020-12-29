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
       models.User.hasMany(models.diarie, {
         foreignKey: "id",
        //  scope: {
        //  commentableType: 'User'
        // }
       })
        models.User.hasMany(models.like, {
          foreignKey : "id",
          // scope: {
          // commentableType: 'User'
          // }
        }),
        models.User.hasMany(models.question, {
          foreignKey : "id",
          // scope: {
          //   commentable: 'User'
          // }
        })
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

// module.exports = (sequelize,DataTypes) => {
//   const Users = sequelize.define("Users",{
//     email : {
//       type : DataTypes.STRING,
//       allowNull : false
//     },
//     password : {
//       type : DataTypes.STRING,
//       allowNull : false
//     },
//     username : {
//       type : DataTypes.STRING,
//       allowNull : false
//     }
//   })
//   Users.associate = (db) => {
//     db.Users.hasMany(db.diaries,db.likes,db.questions, {
//       foreignKey : "userId",
//       scope: {
//         commentable: 'Users'
//       }
//     })
//   }
//   return Users
// }