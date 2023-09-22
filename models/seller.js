'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Seller extends Model {

        static associate({ Products, Orders,Sellercategory,Etrap }) {
            this.hasMany(Products, { as: "products", foreignKey: "sellerId" })
            this.hasMany(Orders, { as: "Orders", foreignKey: "sellerId" })
            this.belongsTo(Sellercategory,{as:"sellerCategory",foreignKey:"sellerCategoryId"})
            this.belongsTo(Etrap,{as:"Etraps", foreignKey: "etrapId"})
        }
    }
    Seller.init({
        seller_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        phone_number: DataTypes.STRING,
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        address: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        deliveryPrice:DataTypes.INTEGER,
        sellerCategoryId:{
            type:DataTypes.INTEGER
        },
        etrapId:{
            type:DataTypes.INTEGER
        }
    }, {
        sequelize,
        tableName: "sellers",
        modelName: 'Seller',
    });
    return Seller;
};