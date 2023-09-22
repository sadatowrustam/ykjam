const express = require("express")
const router = express.Router()
const { getStatic, addOne, getStatisctics } = require("../../../controllers/public/staticControllers")

router.get("/statistics", getStatisctics)
router.get("/:id", getStatic)
router.put("/add-one", addOne)
module.exports = router