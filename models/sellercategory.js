'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sellercategory extends Model {
    static associate({Seller}) {
      // define association here
      this.hasMany(Seller,{as:"sellers",foreignKey:"sellerCategoryId"})
    }
  }
  Sellercategory.init({
    name_tm:{
      type:DataTypes.STRING
    },
    name_ru:{
      type:DataTypes.STRING
    },
  }, {
    sequelize,
    tableName: 'sellercategories',
    modelName: 'Sellercategory',
  });
  return Sellercategory;
};