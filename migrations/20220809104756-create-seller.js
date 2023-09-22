'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('sellers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            seller_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            phone_number: {
                type: DataTypes.STRING
            },
            name: {
                type: DataTypes.STRING
            },
            image: {
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING
            },
            isActive: {
                type: DataTypes.BOOLEAN
            },
            deliveryPrice:{
                type:DataTypes.INTEGER
            },
            sellerCategoryId:{
                type:DataTypes.INTEGER
            },
            etrapId:{
                type:DataTypes.INTEGER
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
        await queryInterface.dropTable('sellers');
    }
};