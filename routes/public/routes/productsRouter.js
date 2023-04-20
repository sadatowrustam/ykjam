const express = require('express');
const {
    searchProducts,
    getOneProduct,
    getProducts,
    searchLite,
    getMostSearches,
    searchProductsMore,
} = require('../../../controllers/public/productsControllers');

const router = express.Router();
router.get("/", getProducts)
router.get('/search', searchProducts);
router.get("/search-lite", searchLite)
router.get("/search-more",searchProductsMore)
router.get("/:id", getOneProduct)
module.exports = router;