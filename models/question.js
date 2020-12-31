'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.question.belongsTo(models.User, {
        foreignKey : "writer",
        targetKey : "username",
        onDelete : "cascade"
      });
      models.question.hasMany(models.like, {
        foreignKey : "question_id",
        sourceKey : "id"
      });
      models.question.hasMany(models.comment, {
        foreignKey : "id",
        sourceKey : "id"
      });
    }
  };
  question.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    writer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'question',
  });

  return question;
};