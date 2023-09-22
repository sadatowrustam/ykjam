'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etrap extends Model {
    static associate({Products,Welayat}) {
      this.belongsTo(Welayat,{as:"welayat",foreignKey:"welayatId"});
      this.hasMany(Products,{as:"product",foreignKey:"etrapId"});
    }
  }
  Etrap.init({
    name_tm: DataTypes.STRING,
    name_ru: DataTypes.STRING,
    welayatId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:"etraps",
    modelName: 'Etrap',
  });
  return Etrap;
};