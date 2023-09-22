'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('adminmessages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            message: {
                type: DataTypes.STRING
            },
            sent_numbers: {
                type: DataTypes.ARRAY(DataTypes.STRING)
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
        await queryInterface.dropTable('adminmessages');
    }
};