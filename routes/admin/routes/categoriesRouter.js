const express = require('express');
const {
    addCategory,
    editCategory,
    deleteCategory,
    getOneCategory,
    uploadCategoryImage,
    uploadCategoryImageMobile,
    deleteImage,
    deleteImageMobile
} = require('../../../controllers/admin/categoriesControllers');
const {
    getAllCategories,
} = require('../../../controllers/public/categoriesControllers');
const router = express.Router();
router.get('/', getAllCategories);
router.get("/:category_id", getOneCategory)
router.post('/add', addCategory);
router.post("/upload-image/:id", uploadCategoryImage)
router.post("/upload-image-mobile/:id",uploadCategoryImageMobile)
router.patch('/:id', editCategory);
router.post("/delete/image-mobile/:id/:index",deleteImageMobile)
router.post("/delete/image/:id/:index",deleteImage)
module.exports = router;