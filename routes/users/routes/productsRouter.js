const express = require("express")
const router = express.Router()
const {
    addProduct,
    getOneProduct,
    getProducts,
    addComment,
    answerComment,
} = require('../../../controllers/users/productsControllers');
router.post("/add",addProduct)
router.get("/", getProducts)
router.post("/add-comment",addComment)
router.post("/answer/:id",answerComment)
// router.get("/categories/:id", getCategoryProducts)
// router.get("/sub-categories/:id", getSubcategoryProducts)
router.get("/:id", getOneProduct)
module.exports = router