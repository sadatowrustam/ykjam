const {
    Categories,
    Products,
    Subcategories,
    Images,
    Market
} = require('../../models');
const {Op}=require("sequelize")
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

exports.getAllCategories = catchAsync(async(req, res) => {
    const limit = req.query.limit || 20;
    const offset = req.query.offset;
    const categories = await Categories.findAll({
        limit,
        offset,
        order: [
            ["createdAt", 'DESC'], 
        ],
        include: {
            model: Subcategories,
            as: 'subcategories',
        },
    });
    return res.status(200).json(categories);
});

exports.getCategoryMarkets = catchAsync(async(req, res, next) => {
    const category = await Categories.findOne({
        where: { category_id: req.params.id },
    });
    const limit=req.query.limit || 20
    const offset=req.query.offset || 0
    if (!category)
    return next(new AppError('Category did not found with that ID', 404));
    let order, where = {}
    where.categoryId=category.id
    const markets = await Market.findAll({
        where,
        order,
        limit,
        offset,
    });
    const count = await Market.count({ where})
    return res.status(200).send({ markets, count });
});
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
