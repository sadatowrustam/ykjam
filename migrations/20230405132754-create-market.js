'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('markets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      body: {
        type: DataTypes.TEXT
      },
      categoryId: {
        type: DataTypes.INTEGER
      },
      subcategoryId: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },
      isActive: {
        type: DataTypes.BOOLEAN
      },
      image: {
        type: DataTypes.STRING
      },
      welayat: {
        type: DataTypes.STRING
      },
      etrap: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('markets');
  }
};