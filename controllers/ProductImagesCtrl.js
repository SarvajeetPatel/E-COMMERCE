const db = require('../models')
const product_images = db.ProductImages
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

const addImage = async (req, res) => {
    var data;
    try {
        req.files.map(async (url) => {
            url.originalname
            data = await product_images.create({
                url: url.originalname,
                productImg_ID: req.body.productId
            })
        }
        )
    } catch (error) {
        console.log(error.message)
    }
    res.json('images uploaded successfully!')
}
// addProductImages
module.exports = { upload, addImage };