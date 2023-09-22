const express = require('express');
const {
    getAllOrders,
    getOrderProducts,
    changeOrderStatus,
    deleteOrderProduct,
    editProduct,
    deleteOrder,
    hasabat,
    giveCheck,
    sendMessage,
    allAdminMessages,
    getAllNUmbers,
    getOrdersByNumber,
    sendToOneUser
} = require('../../../controllers/admin/ordersControllers');

const router = express.Router();
const { protect } = require("../../../controllers/admin/adminControllers")

router.get('/', protect, getAllOrders);
router.delete('/order-products/delete/:id', protect, deleteOrderProduct);
router.get('/order-products/:id', getOrderProducts);
router.patch("/product/:id", protect, editProduct)
router.post('/status/:id', protect, changeOrderStatus);
router.delete("/:id", protect, deleteOrder)
router.get("/hasabat", hasabat)
router.get("/all-phones", getAllNUmbers)
router.get("/by-number", getOrdersByNumber)
router.get("/check/:id/check", giveCheck)
router.post("/send-message", sendMessage)
router.get("/get-messages", allAdminMessages)
router.post("/send-message/one", sendToOneUser)
module.exports = router;