'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Market extends Model {
    static associate({Users,Categories,Subcategories,Products,Images}) {
      this.belongsTo(Users,{foreignKey:"userId",as:"user"})
      this.belongsTo(Categories,{foreignKey:"categoryId",as:"category"})
      this.belongsTo(Subcategories,{foreignKey:"subcategoryId",as:"subcategory"})
      this.hasMany(Products,{foreignKey:"marketId",as:"products"})
      this.hasMany(Images,{foreignKey:"marketId",as:"images"})
    }
  }
  Market.init({
    market_id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
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
    tableName:"markets",
    modelName: 'Market',
  });
  return Market;
};