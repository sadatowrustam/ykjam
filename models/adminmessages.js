'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Adminmessages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Adminmessages.init({
        message: DataTypes.STRING,
        sent_numbers: DataTypes.ARRAY(DataTypes.STRING)
    }, {
        sequelize,
        tableName: "adminmessages",
        modelName: 'Adminmessages',
    });
    return Adminmessages;
};