'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: "user_id",
      });
      User.hasMany(models.TaskPivot, {
        foreignKey: "member_id",
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    role: DataTypes.TINYINT,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
};