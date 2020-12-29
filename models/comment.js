'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.comment.belongsTo(models.question, {
        foreignKey : "question_id"
      }),
      models.comment.belongsTo(models.diarie, {
        foreignKey : "diary_id"
      })
    }
  };
  comment.init({
    diary_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    writer: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};