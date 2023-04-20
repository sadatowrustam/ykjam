const express = require('express');
const {
    getAllActiveProducts,
    getOneProduct,
} = require('../../../controllers/admin/productsControllers');
const router = express.Router();
router.get('/', getAllActiveProducts);
router.get("/:product_id", getOneProduct)
module.exports = router;