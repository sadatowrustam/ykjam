const { Op } = require('sequelize');
const {
    Products,
    Images,
    Market,
} = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
exports.getAll = catchAsync(async(req, res, next) => {
    const limit = req.query.limit || 20;
    let { keyword, offset, sort } = req.query;
    let keywordsArray = [];

    if (keyword) {
        keyword = keyword.toLowerCase();
        keywordsArray.push('%' + keyword + '%');
        keyword = '%' + capitalize(keyword) + '%';
        keywordsArray.push(keyword);
    }
    const markets = await Market.findAll({
        order: [
            ["sequence", "ASC"]
        ],
        limit,
        offset,
        where:{isActive:true}
    });
    return res.status(200).send({ sellers })
})
exports.marketProduct = catchAsync(async(req, res, next) => {
    let market_id = req.params.id
    const limit=req.query.limit || 20
    const offset=req.query.offset || 0
    const market = await Market.findOne({ where: { market_id } })
    if (!market) {
        return next(new AppError(`Seller with id ${market_id} not found`))
    }
    const {sort,discount,isAction}=req.query
    let order, where = []
    where=getWhere(req.query)
    if (sort == 1) {
        order = [
            ['price', 'DESC']
        ];
    } else if (sort == 0) {
        order = [
            ['price', 'ASC']
        ];
    } else if (sort == 3) {
        order = [
            ["sold_count", "DESC"]
        ]
    } else order = [
        ['updatedAt', 'DESC']
    ];
    where.push({ marketId: market.id })
    order.push(["images", "id", "DESC"])
    const productss = await Products.findAll({
        where,
        limit,
        offset,
        order,
        include: [{
            model: Images,
            as: "images"
        }]
    })
    const count = await Products.count({ where })
    const products={
        data:productss,
        count
    }
    // product = awaxit isLiked(product)
    return res.send({ seller, products })
})
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function getWhere({ max_price, min_price, sex,isNew }) {
    let where = []
    if (max_price && min_price == "") {
        let price = {
            [Op.lte]: max_price
        }

        where.push({ price })
    } else if (max_price == "" && min_price) {
        let price = {
            [Op.gte]: min_price
        }
        where.push({ price })

    } else if (max_price && min_price) {
        let price = {
            [Op.and]: [{
                    price: {
                        [Op.gte]: min_price
                    }
                },
                {
                    price: {
                        [Op.lte]: max_price
                    }
                }
            ],
        }
        where.push(price)
    }
    if (sex) {
        sex.split = (",")
        var array = []
        for (let i = 0; i < sex.length; i++) {
            array.push({
                sex: {
                    [Op.eq]: sex[i]
                }
            })
        }
        where.push(array)
        if(isNew) where.push({isNew})
    }
    where.push({isActive:true})
    return where
}