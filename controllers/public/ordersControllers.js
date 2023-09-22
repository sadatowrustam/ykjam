const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Products, Orders, Orderproducts, Stock, Gifts, Userswithgift } = require('../../models');
const { adminWarning, orderNotification } = require("../../utils/email")
const randomstring = require("randomstring")
exports.addMyOrders = catchAsync(async(req, res, next) => {
    var {
        address,
        order_products,
        payment_type,
        user_phone,
        i_take,
        note,
        user_name,
    } = req.body;
    let giftProduct
    let status = "Garashylyar"
    let checkedProducts = [];
    let total_price = 0;
    let total_quantity = 0;
    if (order_products)
        for (var i = 0; i < order_products.length; i++) {
            const product = await Products.findOne({
                where: { product_id: order_products[i].product_id }
            });
            if (!product)
                return next(
                    new AppError(
                        `Product did not found with your ID index: ${i + 1}`,
                        404
                    )
                );
            const stock = await Stock.findOne({ where: { productId: product.id } })
            if (order_products[i].quantity > stock.quantity) {
                order_products[i].quantity = stock.quantity
                stock.quantity = 0
                await stock.save()
                adminWarning({ text: `${product.name_tm} atly haryt gutardy` })
                await product.update({ isActive: false })
            } else {
                if (stock.quantity - order_products.quantity < 6) adminWarning({ text: `${product.name_tm} atly harydyn sany 5-den asak dusdi` })
                stock.quantity = stock.quantity - order_products[i].quantity
                await stock.save()
            }
            total_quantity = total_quantity + Number(order_products[i].quantity);
            checkedProducts.push(product);
            total_price =
                total_price + product.price * Number(order_products[i].quantity);
        }
    let delivery_time = req.body.delivery_time.split(" ")
    let time = delivery_time[1] + "-" + delivery_time[3]
    const today = new Date()
    if (i_take) time = ""
    if (delivery_time[0] == "tomorrow") {
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        delivery_time = lessThan(tomorrow.getDate()) + "." + lessThan(tomorrow.getMonth() + 1) + "/" + time
    } else {
        delivery_time = lessThan(today.getDate()) + "." + lessThan(today.getMonth() + 1) + "/" + time
    }
    const order = await Orders.create({
        total_price,
        address,
        user_phone,
        payment_type,
        i_take,
        note,
        status,
        delivery_time,
        total_quantity,
        user_name
    });
    for (var i = 0; i < checkedProducts.length; i++) {
        await Orderproducts.create({
            orderId: order.id,
            productId: order_products[i].product_id,
            quantity: order_products[i].quantity,
            price: checkedProducts[i].price,
            total_price: Number(
                checkedProducts[i].price * order_products[i].quantity
            ),
        });
    }
    let user = await Userswithgift.findOne({ where: { phone_number: user_phone } })
    const d = new Date()
    if (user) {
        let giftTake = false
        let time = user.expire_date.split(".")
        let month = time[0]
        let day = time[1]
        let hour = time[2]
        let minute = time[3]
        if (month != d.getMonth()) {
            giftProduct = await returnGift(total_price)
            giftTake = true
        } else if ((month != d.getMonth() && hour > d.getHours()) || (hour == d.getHours() && minute > d.getMinutes())) {
            giftProduct = await returnGift(total_price)
            giftTake = true
        } else if (day != d.getDay() - 1 && month != d.getMonth()) {
            giftProduct = await returnGift(total_price)
            giftTake = true
        } else if (day != d.getDay() && hour == d.getHours() && minute > d.getMinutes()) {
            giftProduct = await returnGift(total_price)
            giftTake = true
        } else giftProduct = undefined
        if (giftTake) {
            let expire_date = takeDate()
            await user.update({ expire_date })
        }
    } else {
        giftProduct = await returnGift(total_price)
        let expire_date = takeDate()
        if (giftProduct) {
            await Userswithgift.create({ expire_date, phone_number: user_phone })
        }
    }
    if (giftProduct) {
        await order.update({ giftId: giftProduct.id })
    }
    await orderNotification()
    return res.status(200).json({
        status: 'Your orders accepted and will be delivered as soon as possible',
        order,
        giftProduct
    });
});
exports.check_phone = catchAsync(async(req, res, next) => {
    console.log(128)
    if (req.body.check_phone) {
        const order = await Orders.findOne({ where: { user_phone: req.body.check_phone } })
        if (order) return res.status(200).send({ status: 1 })
        const socket = req.app.get("socket.io")
        const number = randomstring.generate({
            charset: "numeric",
            length: 6
        })
        let obj = {
            text: "Tassyklayys kodunyz " + number,
            number: req.body.check_phone
        }
        socket.emit("verification-phone", obj)
        return res.status(200).send({ status: 0, code: number })
    } else next()
})
async function returnGift(total_price) {
    let maximum = 0
    let giftProduct
    const giftcards = await Gifts.findAll({
        where: { isActive: true },
        order: [
            ["price", "ASC"]
        ]
    })
    for (const giftcard of giftcards) {
        if (giftcard.price > maximum && giftcard.price < total_price || giftcard.price == total_price) {
            maximum = giftcard.price
            giftProduct = giftcard
        }
    }
    return giftProduct
}

function takeDate() {
    const date = new Date()
    let time = date.getMonth() + "." + date.getDay() + "." + date.getHours() + "." + date.getMinutes()

    return time
}

function lessThan(number) {
    if (number < 10) return "0" + number
    return number
}