const express = require('express');
const {
  getSubcategoryMarkets,
} = require('../../../controllers/public/subcategoriesControllers');

const router = express.Router();

router.get('/products/:id', getSubcategoryMarkets);

module.exports = router;
