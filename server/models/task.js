const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
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
    Task.init({
        name: DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        description: DataTypes.STRING,
        status: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Task',
        paranoid: true
    });
    return Task;
};