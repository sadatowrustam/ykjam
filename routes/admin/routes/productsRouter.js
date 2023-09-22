const express = require('express');
const {
    addProduct,
    editProduct,
    uploadProductImage,
    deleteProduct,
    editProductStatus,
    getAllActiveProducts,
    getAllNonActiveProducts,
    getOneProduct,
    deleteProductImage,
    uploadZip,
    uploadExcel,
    addFromExcel
} = require('../../../controllers/admin/productsControllers');
const { protect } = require("../../../controllers/admin/adminControllers")
const router = express.Router();

router.get('/', protect, getAllActiveProducts);
router.get('/non-active', protect, getAllNonActiveProducts);
router.get("/:product_id", protect, getOneProduct)
router.post('/add', protect, addProduct);
router.patch('/:id', protect, editProduct);
router.patch('/edit-status/:id', protect, editProductStatus);
router.delete('/:id', protect, deleteProduct);
router.post('/upload-image/:id', protect, uploadProductImage);
router.delete("/image/:id", protect, deleteProductImage)
router.post("/upload-zip",uploadZip)
router.post("/finish-excel",addFromExcel)
router.post("/upload-excel",uploadExcel)
module.exports = router;