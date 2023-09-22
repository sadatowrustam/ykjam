const express= require('express');
const router=express.Router();
const {getAll,sellerProduct, allCategories}=require('../../../controllers/public/sellerController')
router.get("/",getAll)
router.get("/category",allCategories)
router.get("/:id",sellerProduct)

module.exports=router