'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        static associate({ Subcategories, Products, Images,Market }) {
            this.hasMany(Subcategories, { foreignKey: "categoryId", as: "subcategories" })
            this.hasMany(Products, { foreignKey: "categoryId", as: "products" })
            this.hasMany(Images, { foreignKey: "categoryId", as: "images" })
            this.hasMany(Market, { foreignKey: "categoryId", as: "market"})
        }
    }
    Categories.init({
        category_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name_tm: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Category name cannot be null",
                },
                notEmpty: {
                    msg: "Category name cannot be empty",
                },
            },
        },
        name_ru: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Category name cannot be null",
                },
                notEmpty: {
                    msg: "Category name cannot be empty",
                },
            },
        },
        image:{
            type: DataTypes.TEXT,
            get(){
                const data=this.getDataValue("image").split(",")
                return data
            },
            set(val){
                console.log(val)
                this.setDataValue("image",val.join(","))
            }

        },
        image_mobile:{
            type: DataTypes.TEXT,
            get(){
                const data=this.getDataValue("image_mobile").split(",")
                return data
            },
            set(val){
                this.setDataValue("image_mobile",val.join(","))
            }
        },
        
    }, {
        sequelize,
        tableName: "categories",
        modelName: 'Categories',
    });
    return Categories;
};