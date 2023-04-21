const bcrypt = require('bcryptjs');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Market,Users,Categories,Subcategories,Products,Images } = require('../../models');
const sharp = require('sharp');
const{v4}=require("uuid")
exports.getMyMarkets=catchAsync(async(req,res,next)=>{
    const markets=await Market.findAll({where:{userId:req.user.id},include:{model:Images,as:"images",attributes:["image_id","image"],}})
    return res.send(markets)
})
exports.getOneMarket=catchAsync(async(req,res,next)=>{
    const market=await Market.findOne({where:{market_id:req.params.id},
    include:{
        model:Products,
        as:"products",
        include:{
            model:Images,
            as:"images"
        }
    }
    })
    if(!market) return next(new AppError("Market not found",404));
    return res.send(market)
})
exports.addMArket=catchAsync(async(req,res,next)=>{
    const category=await Categories.findOne({category_id: req.body.category_id})
    req.body.categorId=category.id
    if(req.body.subcategory_id){
        const subcategory=await Subcategories.findOne({category_id: req.body.subcategory_id})
        req.body.subcategoryId=subcategory.id
    }
    req.body.userId=req.user.id
    req.body.isActive=false
    const market=await Market.create(req.body)
    return res.status(201).send(market)
})
exports.editMArket=catchAsync(async(req,res,next)=>{
    const market=await Market.findOne({where:{market_id:req.params.id}})
    const category=await Categories.findOne({category_id: req.body.category_id})
    req.body.categorId=category.id
    if(req.body.subcategory_id){
        const subcategory=await Subcategories.findOne({category_id: req.body.subcategory_id})
        req.body.subcategoryId=subcategory.id
    }
    req.body.userId=req.user.id
    req.body.isActive=false
    await market.update(req.body)
    return res.send(market)
})
exports.deleteMarket = catchAsync(async(req, res, next) => {
    const market = await Market.findOne({ where: { market_id: req.params.id }, include: { model: Products, as: "products" } })
    if (!market) return next(new AppError("market with that id not found", 404))
    for (const one_product of market.products) {
        const product = await Products.findOne({
            where: { market_id: one_product.product_id },
        });
        if (!product)
            return next(new AppError('Product did not found with that ID', 404));
        const images = await Images.findAll({ where: { productId: product.id } })
        for (const image of images) {
            fs.unlink(`static/${image.image}`, function(err) {
                if (err) console.log(err);
            })
        }
        await Images.destroy({where: { productId: product.id}})
        await product.destroy();
    }
    await market.destroy()
    return res.send("Sucess")
})
exports.uploadImageMarket=catchAsync(async(req,res,next)=>{
    const market_id = req.params.id;
    const updateProduct = await Market.findOne({ where: { market_id } });
    let imagesArray = []
    req.files = Object.values(req.files)
    req.files = intoArray(req.files)
    if (!updateProduct)
        return next(new AppError('Product did not found with that ID', 404));
    for (const images of req.files) {
        const image_id = v4()
        const image = `${image_id}_product.webp`;
        const photo = images.data
        let buffer = await sharp(photo).resize(1080,720).webp().toBuffer()

        await sharp(buffer).toFile(`static/${image}`);
        let newImage = await Images.create({ image, image_id, marketId: updateProduct.id, })
        imagesArray.push(newImage)
    }
    return res.status(201).send(imagesArray);
})
const intoArray = (file) => {
    if (file[0].length == undefined) return file
    else return file[0]
}
