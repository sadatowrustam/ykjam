const express = require('express');
const {
    addWelayat,
    editCategory,
    deleteCategory,
    getOneCategory,
    getAllCategories
} = require('../../../controllers/admin/welayatControllers');;
const { protect } = require("../../../controllers/admin/adminControllers")
const router = express.Router();
router.get('/', protect, getAllCategories);
router.get("/:id", protect, getOneCategory)
router.post('/add', protect, addWelayat);
router.patch('/:id', protect, editCategory);
router.post('/delete/:id', protect, deleteCategory);

module.exports = router;