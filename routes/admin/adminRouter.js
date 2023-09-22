const express = require('express')
const router = express.Router()
const { login, protect, updateMe, sendMe, changeTime, getTime, updateEmail, updateMessage, forgotPassword } = require("../../controllers/admin/adminControllers")
router.post("/login", login)
router.post("/edit", protect, updateMe)
router.patch("/email", protect, updateEmail)
router.patch("/message", protect, updateMessage)
router.get("/get-me", protect, sendMe)
router.get("/time", protect, getTime)
router.post("/time", protect, changeTime)
router.patch("/forgot-password", forgotPassword)
router.use("/banners", protect, require("./routes/bannersRouter")) //test edildi
router.use('/categories', protect, require('./routes/categoriesRouter')); //test etmeli
router.use("/velayats",protect,require("./routes/welayatRouter"))
router.use("/etraps",protect,require("./routes/etrapRouter"))
router.use("/subcategories", protect, require("./routes/subcategoriesRouter")) //test etmeli
router.use("/brands", protect, require("./routes/brandsRouter")) //test etmeli
router.use("/products", protect, require("./routes/productsRouter")) //test etmeli
router.use("/texts", protect, require("./routes/textRouter"))
router.use("/orders", require("./routes/ordersRouter"))
router.use("/sellers",protect,require("./routes/sellerRouter"))
router.use("/gifts", protect, require("./routes/giftsRouter"))
router.use("/static", protect, require("./routes/staticRouter"))
router.use("/currency", protect, require("./routes/currencyRouter"))
router.use("/chats", protect, require("./routes/chatRouter"))
module.exports = router