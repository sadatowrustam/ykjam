const express = require('express');
const { sendMyMail } = require('../../controllers/public/contactusControllers');
const router = express.Router();

router.post('/contact-us', sendMyMail);
router.use('/banners', require('./routes/bannersRouter'));
router.use('/categories', require('./routes/categoriesRouter'));
router.use('/sub-categories', require('./routes/subcategoriesRouter'));
router.use('/products', require('./routes/productsRouter'));
router.use("/markets",require("./routes/marketRouter"))
module.exports = router;