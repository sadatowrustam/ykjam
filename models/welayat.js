'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Welayat extends Model {
    static associate({Etrap}) {
      this.hasMany(Etrap,{as:"etraps",foreignKey:"welayatId"})
    }
  }
  Welayat.init({
    name_tm: DataTypes.STRING,
    name_ru: DataTypes.STRING
  }, {
    sequelize,
    tableName:"welayats",
    modelName: 'Welayat',
  });
  return Welayat;
};