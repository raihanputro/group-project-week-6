"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaskPivot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TaskPivot.belongsTo(models.Task, {
        foreignKey: "task_id",
      });
      TaskPivot.belongsTo(models.User, {
        foreignKey: "member_id",
      });
    }
  }
  TaskPivot.init(
    {
      task_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      member_id: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "TaskPivot",
    }
  );
  return TaskPivot;
};
