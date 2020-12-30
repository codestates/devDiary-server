'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.like.belongsTo(models.User, {
        foreignKey : "user_id"
      }),
      models.like.belongsTo(models.diary, {
        foreignKey : "diary_id"
      }),
      models.like.belongsTo(models.question, {
        foreignKey : "question_id"
      })
    }
  };
  like.init({
    diary_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'like',
  });
  return like;
};