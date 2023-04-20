'use strict';
const {v4}=require("uuid")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories', [
      {
        category_id: v4(),
        name_tm:"category 1",
        name_ru:"category 1 rus",
        image:"",
        image_mobile:"",
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        category_id: v4(),
        name_tm:"category 2",
        name_ru:"category 2 rus",
        image:"",
        image_mobile:"",
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        category_id: v4(),
        name_tm:"category 3",
        name_ru:"category 3 rus",
        image:"",
        image_mobile:"",
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      },
      {
        category_id: v4(),
        name_tm:"category 4",
        name_ru:"category 4 rus",
        image:"",
        image_mobile:"",
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now'),
      }], {}
  );
  },

  async down (queryInterface, Sequelize) {
  }
};
