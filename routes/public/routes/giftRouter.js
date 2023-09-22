const express = require("express")
const router = express.Router()
const { allGifts } = require("../../../controllers/public/giftControllers")

router.get("/", allGifts)

module.exports = router