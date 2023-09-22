const { Static, Statistics } = require('../../models');
const statistics = require('../../models/statistics');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

exports.getStatic = catchAsync(async(req, res, next) => {
    const static = await Static.findOne({
        where: { id: req.params.id },
    });
    return res.status(200).send(static)
})
exports.addOne = catchAsync(async(req, res, next) => {
    const statistic = await Statistics.findOne()
    statistic.update({ day: statistic.day + 1, week: statistic.week + 1, month: statistic.month + 1 })
    return res.status(200).send(statistic)
})
exports.getStatisctics = catchAsync(async(req, res, next) => {
    const statistic = await Statistics.findOne()
    return res.status(200).send(statistic)
})