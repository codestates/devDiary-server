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
        foreignKey : "username",
      });
      models.question.hasMany(models.like, {
        foreignKey : "question_id"
      });
      models.question.hasMany(models.comment, {
        foreignKey : "id"
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