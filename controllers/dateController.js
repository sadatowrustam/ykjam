const { Products, Statistics } = require("../models")
const { Op } = require("sequelize")
const schedule = require("node-schedule")
const fs = require("fs")
const dates = schedule.scheduleJob('0 19 15 * * *', async function() {
    var expiration_days = fs.readFileSync('test.txt', 'utf8')
    let today = new Date().getTime()
    let expiration_time_ms = Number(expiration_days) * 86400 * 1000
    let expiration_time = today - expiration_time_ms
    let products = await Products.findAll({
        where: {
            is_new_expire: {
                [Op.lt]: expiration_time
            },
            isNew: true
        }
    })
    for (const product of products) {
        product.update({ isNew: false })
        console.log(`Product with id: ${product.product_id} is not new product now`)
    }
});
const day = schedule.scheduleJob('0 0 0 * * *', async() => {
    let statistika = await Statistics.findOne()
    await statistika.update({ day: 0 })
    console.log("Gunligi pozdy")
});
const month = schedule.scheduleJob('0 0 0 1 * *', async function() {
    let statistika = await Statistics.findOne()
    await statistika.update({ day: 0, month: 0 })
    console.log("Ayy pozdy")

});
const week = schedule.scheduleJob('0 0 0 * * 1', async function() {
    let statistika = await Statistics.findOne()
    await statistika.update({ day: 0, week: 0 })
    console.log("Hepdani pozdy")

});
module.exports = () => { dates }