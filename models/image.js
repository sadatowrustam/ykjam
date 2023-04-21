'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate({ Products, Categories,Market }) {
            this.belongsTo(Products, { foreignKey: "productId", as: "images" })
            this.belongsTo(Categories, { foreignKey: "categoryId", as:"category_images"})
            this.belongsTo(Market, { foreignKey: "marketId",as:"market"})
        }
    }
    Image.init({
        image_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        productId: DataTypes.INTEGER,
        marketId: {
            type: DataTypes.INTEGER
        },
        image: DataTypes.STRING,
        image_mobile:{
            type:DataTypes.STRING
        },
        categoryId: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: "images",
        modelName: 'Images',
    });
    return Image;
};