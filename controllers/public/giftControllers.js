const { Gifts } = require("../../models")
const catchAsync = require("../../utils/catchAsync")

exports.allGifts = catchAsync(async(req, res, next) => {
    const limit = req.query.limit || 20
    const offset = req.query.offset
    const gifts = await Gifts.findAndCountAll({
        order: [
            ["id", "DESC"]
        ],
        limit,
        offset
    })
    return res.status(200).send(gifts)
})