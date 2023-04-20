const express=require("express")
const router=express.Router()
const { addMArket, getMyMarkets, editMArket, deleteMarket,uploadImageMarket, getOneMarket }=require("../../../controllers/users/marketsController")

router.get("/",getMyMarkets)
router.get("/:id",getOneMarket)
router.post("/add",addMArket)
router.patch("/:id",editMArket)
router.post("/delete/:id",deleteMarket)
router.post("/upload-image",uploadImageMarket)
module.exports=router