'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {

        static associate({ Products,Market,Comments }) {
            // this.hasMany(Products,{as:"products",foreignKey:"userId",})
            this.belongsToMany(Products, { through: "Likedproducts", as: "liked_products", foreignKey: "userId" })
            this.hasMany(Market, {foreignKey:"userId",as:"markets" })
            this.hasMany(Comments, {as:"comments",foreignKey:"userId"})
        }
    }
    Users.init({
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        username: DataTypes.STRING,
        user_phone: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        sequelize,
        tableName: "users",
        modelName: 'Users',
    });
    return Users;
};