'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.addColumn(
            "admins",
            "message", { type: DataTypes.STRING, defaultValue: "Sizin zakazynyz kabul edildi!Telefonynyzyn acyk bolmagyny sizden hayysh edyaris" },

        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};