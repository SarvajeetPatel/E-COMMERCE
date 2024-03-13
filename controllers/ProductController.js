var db = require('../models');
var product = db.Product;

var addProducts = async (req, res) => {
    const productData = req.body;
    if (productData.length > 1) {
        var data = await product.bulkCreate(productData)
    } else {
        var data = await product.create(productData)
    }
    res.json({ data: data })
}

var editProducts = async (req, res) => {
    const productData = req.body;
    const data = await product.update(productData, { where: { id: req.params.id } })
    res.json({ data: data })
}

var getAllProducts = async (req, res) => {
    const data = await product.findAll({})
    res.json({ data: data })
}

var getProductByID = async (req, res) => {
    const data = await product.findOne({ where: { id: req.params.id } })
    res.json({ data: data })
}

var deleteProduct = async (req, res) => {
    const data = await product.destroy({ where: { id: req.params.id } })
    res.json({ data: data })
}

module.exports = {
    addProducts,
    getAllProducts,
    getProductByID,
    editProducts,
    deleteProduct
}