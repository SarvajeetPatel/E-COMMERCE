const db = require('../models');
const product = db.Product;
const productImages = db.ProductImages;
const user_products = db.user_product;

const multer = require('multer');
const path = require("path")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
// const upload = multer({ storage: storage }).single('image')
const upload = multer({ storage: storage }).array('image', 10);

const addProducts = async (req, res) => {
    const { title, brand, category, price, currency, inStock, userId } = req.body;
    try {
        var imageData;
        var data = await product.create({
            title: title,
            brand: brand,
            category: category,
            price: price,
            currency: currency,
            inStock: inStock
        })

        if (req.files !== undefined) {
            req.files.map(async (url) => {
                imageData = await productImages.create({
                    url: `/images/${Date.now() + path.extname(url.originalname)}`,
                    productImg_ID: data.id
                })
            })
        }
        res.json({ data, productImages: imageData })

        await user_products.create({ ProductId: data.id, user_ProID: userId })

    } catch (error) {
        console.log(error.message)
    }
}

const editProducts = async (req, res) => {
    const { title, brand, category, price, currency, inStock, productId } = req.body;
    try {
        const values = {
            title: title,
            brand: brand,
            category: category,
            price: price,
            currency: currency,
            inStock: inStock,
        }

        var data = await product.update(values, {
            where: {
                title: req.params.id
            }
        })
        console.log(req.body, "to erdit", req.params.id)

        var imageData;
        req.files.map(async (url) => {
            imageData = await productImages.create({
                url: `/images/${Date.now() + path.extname(url.originalname)}`,
                productImg_ID: productId,
            })
        })
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

const getAllProducts = async (req, res) => {
    try {
        var data = await product.findAll({
            include: [{
                model: productImages, as: 'ProductImages'
            }]
        })
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

const getProductByID = async (req, res) => {
    console.log(req.params.id, "id")
    try {
        var data = await product.findOne({
            where: { title: req.params.id },
            include: [{
                model: productImages, as: 'ProductImages'
            }]
        })
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

const deleteProduct = async (req, res) => {
    try {
        var data = await product.destroy({
            where: { id: req.params.id },
            include: [{
                model: productImages, as: 'ProductImages'
            }]
        })
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

const getUserProducts = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData, "data", userData?.sort?.column)

        const limit = userData?.pagination?.limit ? userData?.pagination?.limit : 0;
        const column = userData?.sort?.column ? userData?.sort?.column : 'id';
        const order = userData?.sort?.order ? userData?.sort?.order : 'ASC';
        const page = (userData?.pagination?.limit && userData?.pagination?.page) ? ((userData?.pagination?.limit * userData?.pagination?.page) - userData?.pagination?.limit) : 0;

        const data = await product.findAll({
            where: {
                user_ProID: userData?.userId,
            },
            order: [[column, order]],
            limit: limit,
            offset: page,
            include: [{
                model: productImages, as: 'ProductImages'
            }]
        })

        const totalRec = await product.findAndCountAll()
        const pagination = {
            "totalRecords": totalRec.count,
            "totalPage": Math.ceil(totalRec.count / limit),
            "currentPage": userData?.pagination?.page,
            "recordFrom": page + 1,
            "recordTo": page + limit,
        }
        res.json({ data, pagination, count: totalRec.count })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    upload,
    addProducts,
    getAllProducts,
    getProductByID,
    getUserProducts,
    editProducts,
    deleteProduct
}