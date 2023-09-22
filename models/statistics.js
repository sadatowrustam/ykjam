'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Statistics extends Model {

        static associate(models) {}
    }
    Statistics.init({
        day: DataTypes.INTEGER,
        month: DataTypes.INTEGER,
        week: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: "statistics",
        modelName: 'Statistics',
    });
    return Statistics;
};