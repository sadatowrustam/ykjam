const { Op } = require('sequelize');
const { Market, Subcategories } = require('../../models');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

exports.getSubcategoryMarkets = catchAsync(async(req, res, next) => {
    const subcategory = await Subcategories.findOne({
        where: { category_id: req.params.id },
    });
    const limit=req.query.limit || 20
    const offset=req.query.offset || 0
    if (!subcategory)
    return next(new AppError('Subcategory did not found with that ID', 404));
    let order, where = {}
    where.subcategoryId=subcategory.id
    const markets = await Market.findAll({
        where,
        order,
        limit,
        offset,
    });
    const count = await Market.count({ where})
    return res.status(200).send({ markets, count });
});
