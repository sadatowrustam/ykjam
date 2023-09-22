const { Op } = require('sequelize');
const {
  Products,
  Sellercategory,
  Stock,
  Seller
} = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
exports.getAll=catchAsync(async(req,res,next)=>{
    const limit = req.query.limit || 20;
    let { offset, sort,category } = req.query;
      let where={}
      where.isActive=true
      if(category && category!="undefined") where.sellerCategoryId=category
    const sellers = await Seller.findAll({
        where,
        order:[["id","DESC"]],
        limit,
        offset,
    });
    const count=await Seller.count({where})
    return res.status(200).send({sellers,count})
})
exports.sellerProduct=catchAsync(async(req,res,next)=>{
    let seller_id=req.params.id
    const seller=await Seller.findOne({where:{seller_id}})
    if(!seller){
        return next(new AppError(`Seller with id ${seller_id} not found`))
    }
    const product=await Products.findAll({
        where:{sellerId:seller.id,isActive: true},
        include:[
            {
                model:Stock,
                as:"product_stock"
            }
        ]
    })
  return res.send({seller,product})
})
exports.allCategories=catchAsync(async(req,res,next)=>{
  const limit=req.query.limit ||20
  const offset=req.query.offset || 0
  let sellerCategory=await Sellercategory.findAll({limit,offset})
  let count=await Sellercategory.count()
  return res.send({sellerCategory,count})
})
const capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };