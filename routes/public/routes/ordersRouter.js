const express = require("express")
const router = express.Router()
const { addMyOrders, check_phone } = require("../../../controllers/public/ordersControllers")
router.post("/add", check_phone, addMyOrders)
module.exports = router