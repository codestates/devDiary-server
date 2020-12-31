'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.diary.belongsTo(models.User, {
        foreignKey : "writer",
        targetKey : "username",
        onDelete : "cascade"
      });
      models.diary.hasMany(models.like, {
        foreignKey : "diary_id",
        sourceKey : "id"
      }),
      models.diary.hasMany(models.comment, {
        foreignKey : "diary_id",
        sourceKey : "id"
      })
    }
  };
  diary.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    writer: DataTypes.STRING,
    tags: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'diary',
  });
  return diary;
};