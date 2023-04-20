const express = require('express');
const {
    getAllCategories,
    getCategoryMarkets,
} = require('../../../controllers/public/categoriesControllers');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/products/:id', getCategoryMarkets);

module.exports = router;