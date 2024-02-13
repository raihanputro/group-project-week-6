const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TaskPivot extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // eslint-disable-next-line no-unused-vars
        static associate(models) {
            // define association here
            // * no assoc as of now
        }
    }
    TaskPivot.init({
        user_id: DataTypes.INTEGER,
        task_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'TaskPivot',
        paranoid: true
    });
    return TaskPivot;
};