const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Seller,Products,Categories,Sellercategory,Images } = require('../../models');
const sharp=require("sharp")
const {unlinkSync}=require("fs")
exports.addSeller=catchAsync(async (req, res, next) => {
  req.body.isActive=true
  console.log(req.body)
  let seller=await Seller.create(req.body)
  return res.send(seller)
})  
exports.addCategory=catchAsync(async (req, res, next) => {
  const sellerCategory=await Sellercategory.create(req.body)
  return res.send(sellerCategory)
})  
exports.editCategory=catchAsync(async (req, res, next) => {
  const sellerCategory=await Sellercategory.findOne({where:{id:req.params.id}})
  await sellerCategory.update(req.body)
  return res.send(sellerCategory)
})  
exports.editSeller=catchAsync(async (req, res, next) => {
  const seller=await Seller.findOne({where:{seller_id:req.params.id}})
  await seller.update(req.body)
  return res.send(seller)
}) 
exports.isActive=catchAsync(async (req,res,next)=>{
  let {isActive,seller_id}=req.body
  let seller=await Seller.findOne({where:{seller_id}})
  if(!seller){
    return next(new AppError("There is no seller with this id",404))
  }
  await seller.update({isActive})
  return res.send(seller)
})
exports.allSellers=catchAsync(async(req,res,next)=>{
  let limit=req.query.limit || 20
  let offset=req.query.offset || 0
  let where={}
  if(req.query.isActive || req.query.isActive!="undefined") where.isActive=req.query.isActive
  let seller=await Seller.findAll(
    {
      limit,
      offset
  }
  )
  let count=await Seller.count()
  return res.send({seller,count})
})
exports.allCategories=catchAsync(async(req,res,next)=>{
  let sellerCategory=await Sellercategory.findAll()
  let count=await Sellercategory.count()
  return res.send({sellerCategory,count})
})
exports.oneSeller=catchAsync(async(req,res,next)=>{
  let seller_id=req.params.id
  let seller=await Seller.findOne({where:{seller_id},include:[
    {
      model:Products,
      as:"products",
      include:{
        model:Images,
        as:"images"
      }
    }
  ]})
  return res.send(seller)
})
exports.deleteSeller = catchAsync(async(req, res, next) => {
  const seller_id = req.params.id;
  const seller = await Seller.findOne({ where: { seller_id } });
  if (!seller)
      return next(new AppError('Category did not found with that ID', 404));

  const products = await Products.findAll({
      where: { sellerId: [seller.id] },
  });

  if (products) {
      for (const product of products) {
        const images=await Images.findAll({where:{productId:product.id}})
        for(const image of images) {
          unlinkSync("public/"+image.image)
        }
        await Images.destroy({where:{productId:product.id}})
        await Stock.destroy({ where: { productId: [product.id] } });
      }
    }
  await Products.destroy({where:{sellerId:seller.id}});
  await seller.destroy();

  return res.status(200).send('Successfully Deleted');
});
exports.deleteCategory = catchAsync(async(req, res, next) => {
  const sellerCategory=await Sellercategory.findOne({where:{id:req.params.id}})

  const sellers = await Seller.findAll({ where: { sellerCategoryId:sellerCategory.id } });

  for(const seller of sellers){
    const products = await Products.findAll({
        where: { categoryId: [seller.id] },
    });
  
    if (products) {
        for (const product of products) {
          const images=await Images.findAll({where:{productId:product.id}})
          for(const image of images) {
            unlinkSync("public/"+image.image)
          }
          await images.destroy()
          await Stock.destroy({ where: { productId: [product.id] } });
        }
      }
      await Products.destroy({where:{sellerId:seller.id}});
  }
  await Seller.destroy({where:{sellerCategoryId:sellerCategory.id}})
  await sellerCategory.destroy()

  return res.status(200).send('Successfully Deleted');
});
exports.uploadSellerImage = catchAsync(async(req, res, next) => {
  const updateSeller = await Seller.findOne({ where: { seller_id: req.params.id } });
  console.log(req.files)
  req.files = Object.values(req.files)
  if (!updateSeller)
      return next(new AppError('Brand did not found with that ID', 404));

  const image = `${updateSeller.seller_id}_seller.webp`;
  const photo = req.files[0].data
  let buffer = await sharp(photo).webp().toBuffer()

  await sharp(buffer).toFile(`static/${image}`);

  await updateSeller.update({
      image,
  });
  return res.status(200).send(updateSeller);
});