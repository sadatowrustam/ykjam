const express = require('express');
const router = express.Router()
const {addSeller,isActive,allSellers,oneSeller, addCategory, editCategory, editSeller, deleteSeller, deleteCategory, allCategories, uploadSellerImage}=require("../../../controllers/admin/sellerControllers")

router.post("/add",addSeller)
router.patch("/:id",editSeller)
router.post("/isActive",isActive)
router.get("/",allSellers)
router.get("/category",allCategories)
router.post("/category/add",addCategory)
router.patch("/category/:id",editCategory)
router.post("/delete/:id",deleteSeller)
router.post("/category/delete/:id",deleteCategory)
router.post("/upload-image/:id",uploadSellerImage)
router.get("/:id",oneSeller)


module.exports = router;
