const express = require('express');
const router = express.Router();
const { getAll, marketProduct } = require('../../../controllers/public/marketController')
router.get("/", getAll)
router.get("/:id", marketProduct)
module.exports = router