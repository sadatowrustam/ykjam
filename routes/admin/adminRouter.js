const express = require('express')
const router = express.Router()
const { login, protect, updateMe, sendMe,getStats } = require("../../controllers/admin/adminControllers")
router.post("/login", login)
router.post("/edit", protect, updateMe)
router.get("/get-me", protect, sendMe) 
router.get("/stats",getStats)
router.use("/banners", require("./routes/bannersRouter")) //test edildi
router.use('/categories', require('./routes/categoriesRouter')) ; //delete test etmeli
router.use("/subcategories", require("./routes/subcategoriesRouter")) //test edildi
router.use("/products", require("./routes/productsRouter")) //test etmeli
router.use("/users", protect, require("./routes/usersRouter"))
router.use("/email",protect, require("./routes/mailRouter"))
module.exports = router