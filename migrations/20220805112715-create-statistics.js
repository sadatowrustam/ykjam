'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('statistics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            day: {
                type: DataTypes.INTEGER
            },
            month: {
                type: DataTypes.INTEGER
            },
            week: {
                type: DataTypes.INTEGER
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
        await queryInterface.dropTable('statistics');
    }
};