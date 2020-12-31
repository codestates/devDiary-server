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
      // define association here
      comment.belongsTo(models.question, {
        foreignKey : "question_id",
        onDelete:'cascade'
      });
      comment.belongsTo(models.diary, {
        foreignKey : "diary_id",
        onDelete:'cascade'
      });
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