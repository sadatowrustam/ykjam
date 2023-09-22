'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.bulkInsert(
            'statistics', [{
                week: 0,
                month: 0,
                day: 0,
                createdAt: DataTypes.fn("now"),
                updatedAt: DataTypes.fn("now")
            }], {}
        );
    },

    async down(queryInterface, DataTypes) {
        await queryInterface.bulkDelete('statistics', null, {});
    }
};