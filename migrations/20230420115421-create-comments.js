'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      comment_id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
      productId: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },
      comment: {
        type: DataTypes.TEXT
      },
      answer: {
        type: DataTypes.TEXT
      },
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('comments');
  }
};