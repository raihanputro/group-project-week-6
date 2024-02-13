"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Tasks",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
        start_date: {
          type: Sequelize.DATE,
        },
        end_date: {
          type: Sequelize.DATE,
        },
        status: {
          type: Sequelize.STRING,
        },
        user_id: {
          type: Sequelize.INTEGER,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        paranoid: true, // Enable soft deletion
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tasks");
  },
};
