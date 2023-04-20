const fs = require('fs');
const sharp = require("sharp")
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
    Categories,
    Subcategories,
    Products,
    Stock,
} = require('../../models');
const {v4}=require("uuid")
exports.addCategory = catchAsync(async(req, res) => {
    const newCategory = await Categories.create(req.body);
    return res.status(201).send(newCategory);
});

exports.editCategory = catchAsync(async(req, res, next) => {
    const category = await Categories.findOne({
        where: { category_id: req.params.id },
    });

    if (!category)
        return next(new AppError('Category did not found with that ID', 404));

    const { name_tm, name_ru} = req.body;
    if (
        typeof name_tm !== 'string' ||
        name_tm.length < 1 ||
        typeof name_ru !== 'string' ||
        name_ru.length < 1
    )
        return next(new AppError('Invalid Credentials', 400));

    await category.update({ name_tm, name_ru});

    return res.status(200).send(category);
});
exports.getOneCategory = catchAsync(async(req, res, next) => {
    let { category_id } = req.params
    const category = await Categories.findOne({
        where: { category_id },
        include: {
            model: Subcategories,
            as: "subcategories"
        }
    });
    if (!category) {
        return next(new AppError("Category not found with that id", 404))
    }
    return res.status(200).send(category)
})
exports.uploadCategoryImage = catchAsync(async(req, res, next) => {
    const category_id = req.params.id;
    const category = await Categories.findOne({ where: { category_id } });
    let imagesArray
    if(category.image[0]!="") imagesArray = category.image
    else imagesArray=[]   
    req.files = Object.values(req.files)
    req.files = intoArray(req.files)
    if (!category)
        return next(new AppError('Product did not found with that ID', 404));
    for (const images of req.files) {
        const image_id = v4()
        const image = `${image_id}_category.webp`;
        const photo = images.data
        let buffer = await sharp(photo).resize(1080,720).webp().toBuffer()
        await sharp(buffer).toFile(`static/${image}`);
        imagesArray.push(image)
    }
    await category.update({image:imagesArray})
    return res.status(200).send(category);
});
exports.uploadCategoryImageMobile = catchAsync(async(req, res, next) => {
    const category_id = req.params.id;
    const category = await Categories.findOne({ where: { category_id } });
    let array
    if(category.image_mobile[0]!="") array = category.image_mobile
    else array=[]
    req.files = Object.values(req.files)
    req.files = intoArray(req.files)
    if (!category)
        return next(new AppError('Product did not found with that ID', 404));
    for (const images of req.files) {
        const image_id = v4()
        const image_mobile = `${image_id}_category_mobile.webp`;
        const photo = images.data
        let buffer = await sharp(photo).resize(1080,720).webp().toBuffer()
        await sharp(buffer).toFile(`static/${image_mobile}`);
        array.push(image_mobile)
    }
    await category.update({image_mobile:array})
    return res.status(200).send(category);
});
exports.deleteImage=catchAsync(async(req,res,next)=>{
    const category_id = req.params.id;
    const index=req.params.index
    const category = await Categories.findOne({ where: { category_id } });
    let image=category.image.splice(index,1)
    await category.update({image})
    return res.send(category)
})
exports.deleteImageMobile=catchAsync(async(req,res,next)=>{
    const category_id = req.params.id;
    const index=req.params.index
    const category = await Categories.findOne({ where: { category_id } });
    let image_mobile=category.image_mobile.splice(index,1)
    await category.update({image_mobile})
    return res.send(category)

})
const intoArray = (file) => {
    if (file[0].length == undefined) return file
    else return file[0]
}