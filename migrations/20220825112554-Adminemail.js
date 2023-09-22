'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.addColumn(
            "admins",
            "email", { type: DataTypes.STRING, defaultValue: "hydyrowayhan7@gmail.com" },

        )
    },

    async down(queryInterface, DataTypes) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};