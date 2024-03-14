const db = require('../models');
const product = db.Product;

const addProducts = async (req, res) => {
    const productData = req.body;
    try {
        var data = await product.bulkCreate(productData)
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

const editProducts = async (req, res) => {
    const productData = req.body;
    try {
        var data = await product.update(productData, { where: { id: req.params.id } })
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

const getAllProducts = async (req, res) => {
    try {
        var data = await product.findAll({})
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

const getProductByID = async (req, res) => {
    try {
        var data = await product.findOne({ where: { id: req.params.id } })
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

const deleteProduct = async (req, res) => {
    try {
        var data = await product.destroy({ where: { id: req.params.id } })
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

module.exports = {
    addProducts,
    getAllProducts,
    getProductByID,
    editProducts,
    deleteProduct
}