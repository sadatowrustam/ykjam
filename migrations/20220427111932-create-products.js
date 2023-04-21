'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            product_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },

            name_tm: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Product name cannot be null",
                    },
                    notEmpty: {
                        msg: "Product name cannot be empty",
                    },
                },
            },
            name_ru: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Product name cannot be null",
                    },
                    notEmpty: {
                        msg: "Product name cannot be empty",
                    },
                },
            },
            body_tm: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Title cannot be null",
                    },
                    notEmpty: {
                        msg: "Title cannot be empty",
                    },
                },
            },
            body_ru: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Title cannot be null",
                    },
                    notEmpty: {
                        msg: "Title cannot be empty",
                    },
                },
            },
            price: {
                type: DataTypes.REAL
            },
            isActive: {
                type: DataTypes.BOOLEAN
            },
            isLiked: {
                type: DataTypes.BOOLEAN
            },
            categoryId: {
                type: DataTypes.INTEGER,
            },
            subcategoryId: {
                type: DataTypes.INTEGER
            },
            marketId:{
                type:DataTypes.INTEGER
            },
            note:{
                type:DataTypes.TEXT
            },
            hasComment:{
                type:DataTypes.BOOLEAN,
                defaultValue:false,
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
        await queryInterface.dropTable('products');
    }
};