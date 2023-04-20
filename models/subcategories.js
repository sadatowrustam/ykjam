'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subcategories extends Model {

        static associate({ Categories, Products,Market }) {
            this.belongsTo(Categories, { foreignKey: "categoryId", as: "category" })
            this.hasMany(Products, { foreignKey: "subcategoryId", as: "products" })
            this.hasMany(Market, { foreignKey: "subcategoryId", as: "market" })
        }
    }
    Subcategories.init({
        subcategory_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name_tm: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Subcategory name cannot be null",
                },
                notEmpty: {
                    msg: "Subcategory name cannot be empty",
                },
            },
        },
        name_ru: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Subcategory name cannot be null",
                },
                notEmpty: {
                    msg: "Subcategory name cannot be empty",
                },
            },
        },
        sequence:{
            type:DataTypes.INTEGER,
            defaultValue:1
        },
        categoryId: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: "subcategories",
        modelName: 'Subcategories',
    });
    return Subcategories;
};