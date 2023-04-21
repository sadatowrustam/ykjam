'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        static associate({ Users, Categories, Subcategories, Images,Market,Comments}) {
            this.belongsTo(Categories, { foreignKey: "categoryId", as: "category" })
            this.belongsTo(Subcategories, { foreignKey: "subcategoryId", as: "subcategory" })
            this.hasMany(Images, { foreignKey: "productId", as: "images" })
            // this.belongsTo(Users, { as: "user", foreignKey: "userId" })
            this.belongsToMany(Users, { through: "Likedproducts", as: "liked_users", foreignKey: "productId" })
            this.belongsTo(Market, { as: "market", foreignKey: "marketId"})
            this.hasMany(Comments, { as: "comments", foreignKey: "comments" })
        }
    }
    Products.init({
        product_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name_tm: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Product cannot be null",
                },
                notEmpty: {
                    msg: "Product cannot be empty",
                },
            },
        },
        name_ru: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Product cannot be null",
                },
                notEmpty: {
                    msg: "Product cannot be empty",
                },
            },
        },
        body_tm: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Product description cannot be null",
                },
                notEmpty: {
                    msg: "Product description cannot be empty",
                },
            },
        },
        body_ru: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Product description cannot be null",
                },
                notEmpty: {
                    msg: "Product description cannot be empty",
                },
            },
        },
        price: DataTypes.REAL,
        isActive: {
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },

        isLiked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        note:DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        subcategoryId: DataTypes.INTEGER,
        marketId: DataTypes.INTEGER,
        hasComment:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        }

    }, {
        sequelize,
        tableName: "products",
        modelName: 'Products',
    });
    return Products;
};