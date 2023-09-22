const fs = require('fs');
const { Op } = require('sequelize');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
    Welayat,
    Etrap
} = require('../../models');

exports.addWelayat = catchAsync(async(req, res) => {
    const newCategory = await Welayat.create(req.body);
    return res.status(201).send(newCategory);
});
exports.getAllCategories = catchAsync(async(req, res, next) => {
    const sort = req.query
    let order
    order = [
        ["id", "DESC"]
    ]
    if (sort.name == "id" && sort.bool == "true") {
        order = [
            ["id", "ASC"]
        ]
    } else if (sort.name == "id" && sort.bool == "false") {
        order = [
            ["id", "DESC"]
        ]
    } else if (sort.name == "name" && sort.bool == "true") {
        order = [
            ["name_tm", "DESC"]
        ]
    } else if (sort.name == "name" && sort.bool == "false") {
        order = [
            ["name_tm", "ASC"]
        ]
    }
    const categories = await Welayat.findAndCountAll({
        order,
        include: {
            model: Etrap,
            as: 'etraps',
        },
    });
    return res.status(200).send(categories);
})

exports.editCategory = catchAsync(async(req, res, next) => {
    const category = await Welayat.findOne({
        where: { id: req.params.id },
    });

    if (!category)
        return next(new AppError('Welayat did not found with that ID', 404));

    const { name_tm, name_ru } = req.body;
    await category.update({ name_tm, name_ru });

    return res.status(200).send(category);
});

exports.deleteCategory = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const category = await Welayat.findOne({ where: { id } });
    if (!category)
        return next(new AppError('Category did not found with that ID', 404));
    await category.destroy();

    return res.status(200).send('Successfully Deleted');
});
exports.getOneCategory = catchAsync(async(req, res, next) => {
    let { category_id } = req.params
    const limit=req.query.limit||20
    const offset=req.query.offset||0
    const category = await Welayat.findOne({
        where: { category_id },
        include: {
            model: Etrap,
            as: "etraps",
            limit,
            offset
        }
    });
    if (!category) {
        return next(new AppError("Category not found with that id", 404))
    }
    return res.status(200).send(category)
})
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};