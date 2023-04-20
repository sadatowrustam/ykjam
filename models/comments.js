'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate({Products,Users}) {
      this.belongsTo(Products,{as:"product",foreignKey:"userId"})
      this.belongsTo(Users,{as:"user",foreignKey:"userId"})
    }
  }
  Comments.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    answer: DataTypes.TEXT,
    like:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    dislike:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    isActive:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
  }, {
    sequelize,
    tableName:"comments",
    modelName: 'Comments',
  });
  return Comments;
};