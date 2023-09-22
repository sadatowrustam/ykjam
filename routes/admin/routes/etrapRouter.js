const express = require('express');
const {
    addSubcategory,
    editSubcategory,
    deleteSubcategory,
    getOne
} = require('../../../controllers/admin/etrapControllers');
const { protect } = require("../../../controllers/admin/adminControllers")
const router = express.Router();
router.get("/:id", protect, getOne)
router.post('/add', protect, addSubcategory);
router.patch('/:id', protect, editSubcategory);
router.post('/delete/:id', protect, deleteSubcategory);

module.exports = router;