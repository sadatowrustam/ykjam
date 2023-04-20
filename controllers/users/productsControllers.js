const { Op } = require('sequelize');
const {
    Products,
    Categories,
    Images,
    Market,
    Subcategories,
    Comments
} = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const {isUUID}=require("validator")
const AppError = require('../../utils/appError');
exports.addProduct = catchAsync(async(req, res, next) => {
    const category = await Categories.findOne({
        where: { category_id: req.body.category_id },
    });
    req.body.isActive = false
    if (!category)
        return next(new AppError('Category did not found with that ID', 404));
    if (req.body.subcategory_id) {
        const subcategory = await Subcategories.findOne({
            where: { subcategory_id: [req.body.subcategory_id] },
        });
        if (!subcategory)
            return next(new AppError('Sub-category did not found with that ID', 404));
        req.body.subcategoryId = subcategory.id;
    }
    const market=await Market.findOne({where:{market_id:req.body.market_id}})
    req.body.categoryId = category.id;
    req.body.sellerId = req.user.id
    req.body.marketId=market.id
    const newProduct = await Products.create(req.body);
    return res.status(201).send(newProduct)
})
exports.editProduct = catchAsync(async(req, res, next) => {
    const product = await Products.findOne({
        where: { product_id: req.params.id },
    });
    if (!product)
        return next(new AppError('Product did not found with that ID', 404));
    req.body.price_old=null
    const category=await Categories.findOne({where:{category_id:req.body.category_id}})
    req.body.categoryId=category.id
    if(req.body.subcategory_id){
        const subcategory=await Subcategories.findOne({where:{subcategory_id:req.body.subcategory_id}})
        req.body.subcategoryId=subcategory.id
    }
    await product.update(req.body);
    return res.status(200).send(product);
});
exports.getProducts = catchAsync(async(req, res) => {
    const limit = req.query.limit || 10;
    const { offset } = req.query;
    where.isActive=true
    let products = await Products.findAll({
        order:[["createdAt","DESC"]],
        limit,
        offset,
        include: [{
                model: Images,
                as: "images"
            }
        ],
        where
    });
    products = await isLiked(products, req)
    return res.status(200).json(products);
});
exports.getOneProduct = catchAsync(async(req, res, next) => {
    const { product_id } = req.params
    const oneProduct = await Products.findOne({
        where: { product_id },
        include: [
            {
                model: Images,
                as: "images"
            },
        ]
    })
    return res.send(oneProduct)
})
exports.addComment=catchAsync(async(req, res, next) => {
    const product=await Products.findOne({where:{product_id:req.body.product_id}})
    if(!product) return next(new AppError("Product not found",404))
    req.body.productId=product.id
    req.body.userId=req.user.id
    const comment=await Comments.create(req.body)
    return res.status(201).send(comment)
})
exports.answerComment=catchAsync(async(req,res,next)=>{
    const comment=await Comments.findOne({where:{comment_id:req.params.id}})
    await comment.update({answer:req.body.answer})
    return res.send(comment)
})
// Search
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

