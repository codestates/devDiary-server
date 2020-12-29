'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diarie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.diarie.belongsTo(models.User, {
        foreignKey : "id",
      }),
      models.diarie.hasMany(models.like, {
        foreignKey : "diary_id",
        // scope : {
        //   commentableType : "diarie"
        // }
      }),
      models.diarie.hasMany(models.comment, {
        foreignKey : "id"
      })
    }
  };
  diarie.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    writer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'diarie',
  });
  return diarie;
};