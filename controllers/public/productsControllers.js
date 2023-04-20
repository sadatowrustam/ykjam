const { Op, where } = require('sequelize');
const {
    Products,
    Subcategories,
    Images,
    Users,
} = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const {isUUID}=require("validator")
exports.getProducts = catchAsync(async(req, res) => {
    const limit = req.query.limit || 10;
    const { offset } = req.query;
    const products = await Products.findAll({
        order:[["createdAt","DESC"]],
        where:{isActive:true},
        limit,
        offset,
        include: [{
            model: Images,
            as: "images"
        }, ],
    });
    return res.status(200).json(products);
});
// Search
const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.searchProducts = catchAsync(async(req, res, next) => {
    const limit = req.query.limit || 20;
    let { keyword, offset, sort } = req.query;
    var order;
    order=getOrder(req.query)
    let keywordsArray = [];
    let keyword2=keyword
    keyword = keyword.toLowerCase();
    keywordsArray.push('%' + keyword + '%');
    keyword = '%' + capitalize(keyword) + '%';
    keywordsArray.push(keyword);
    
    let where = {
        [Op.or]: [{
                name_tm: {
                    [Op.like]: {
                        [Op.any]: keywordsArray,
                    },
                },
            },
            {
                name_ru: {
                    [Op.like]: {
                        [Op.any]: keywordsArray,
                    },
                },

            },
        ],
        isActive:true
    }
    const productss = await Products.findAll({
        where,
        order,
        limit,
        offset,
        include:[
            {
                model:Images,
                as:"images"
            }
        ]
    });
    const count=await Products.count({where})
    const products={
        data:productss,
        count:count
    }

    return res.status(200).send({ products });
});
exports.searchProductsMore = catchAsync(async(req, res, next) => {
    const limit = req.query.limit || 20;
    let { keyword, offset, sort } = req.query;
    var order;
    order=getOrder(req.query)
    let keywordsArray = [];
    keyword = keyword.toLowerCase();
    keywordsArray.push('%' + keyword + '%');
    keyword = '%' + capitalize(keyword) + '%';
    keywordsArray.push(keyword);
    let where = {
        [Op.or]: [{
                name_tm: {
                    [Op.like]: {
                        [Op.any]: keywordsArray,
                    },
                },
            },
            {
                name_ru: {
                    [Op.like]: {
                        [Op.any]: keywordsArray,
                    },
                },

            },
        ],
        isActive:true
    }
    const productss = await Products.findAll({
        where,
        order,
        limit,
        offset,
        include:[
            {
                model:Images,
                as:"images"
            }
        ]
    });
    const count=await Products.count({where})
    const products={
        data:productss,
        count:count
    }
    return res.status(200).send({ products});
});
exports.searchLite = catchAsync(async(req, res, next) => {
    let { keyword } = req.query
    let keyword2=keyword
    let keywordsArray = [];
    keyword = keyword.toLowerCase();
    keywordsArray.push('%' + keyword + '%');
    keyword = '%' + capitalize(keyword) + '%';
    keywordsArray.push(keyword);
    let where = {
        [Op.or]: [{
                name_tm: {
                    [Op.like]: {
                        [Op.any]: keywordsArray,
                    },
                },
            },
            {
                name_ru: {
                    [Op.like]: {
                        [Op.any]: keywordsArray,
                    },
                },

            },
        ],
    }
    const products = await Products.findAll({
        where,
        offset:0,
    });
    delete where.isActive
    const subcategories = await Subcategories.findAll({
        where,
        offset:0
    })
    const sellers = await Seller.findAll({
        where,
        offset:0
    })
    let names=[]
    for(const product of products){
        console.log(product.name_tm,product.name_ru,keyword2)
        if(product.name_tm.includes(keyword2) || product.name_tm.includes(capitalize(keyword2))){
            names.push(product.name_tm)
        }else {
            names.push(product.name_ru)
        }
}
    for(const subcategory of subcategories){
        if(subcategory.name_tm.includes(keyword2) || subcategory.name_tm.includes(capitalize(keyword2))){
            names.push(subcategory.name_tm)
        }else {
            names.push(subcategory.name_ru)
        }
    }
    for(const seller of sellers){
        if(seller.name_tm.includes(keyword2) || seller.name_tm.includes(capitalize(keyword2))){
            names.push(seller.name_tm)
        }else {
            names.push(seller.name_ru)
        }
    }
    console.log(names)
    return res.status(200).send(names);
})
exports.getOneProduct = catchAsync(async(req, res, next) => {
    const product_id = req.params.id

    let where={}
    if(isUUID(product_id)) {
        where.product_id=product_id
    }
    else where.product_code=product_id
    const oneProduct = await Products.findOne({
        where,
        include: [
            {
                model: Images,
                as: "images"
            },
        ]
    })
    if (!oneProduct) {
        return next(new AppError("Can't find product with that id"), 404);
    }
    const sellerId = oneProduct.userId
    const recommenendations = await Products.findAll({
        where: { sellerId,id:{[Op.not]:oneProduct.id} },
        include: {
            model: Images,
            as: "images",
        },
        limit:10
    })
    const product = {
        oneProduct,
        recommenendations
    }
    return res.send({ product })
})
function getWhere({ max_price, min_price, sex,is_new }) {
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
    if(is_new && is_new=="true") where.push({isNew:true})
    where.push({isActive:true})
    return where
}
function getOrder({sort}){
    let order=[]
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
    return order
}