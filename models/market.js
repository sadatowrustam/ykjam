'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Market extends Model {
    static associate({Users,Categories,Subcategories,Products}) {
      this.belongsTo(Users,{foreignKey:"userId",as:"user"})
      this.belongsTo(Categories,{foreignKey:"categoryId",as:"category"})
      this.belongsTo(Subcategories,{foreignKey:"subcategoryId",as:"subcategory"})
      this.hasMany(Products,{foreignKey:"marketId",as:"product"})
    }
  }
  Market.init({
    name: DataTypes.STRING,
    body: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    subcategoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    welayat: DataTypes.STRING,
    etrap: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Market',
  });
  return Market;
};