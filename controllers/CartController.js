var db = require('../models');
var cart = db.Cart;
var cart_product = db.cart_product;
var products = db.Product;

const addToCart = async (req, res) => {
    const { productId, cartId } = req.body;
    const data = await cart.findOne({ where: { id: cartId } })

    try {
        if (!data) {
            res.status(404).send('Cart Does not Exists!')
        }
        else {
            var cartData = await cart_product.create({ CartId: data.id, ProductId: productId })
        }
    } catch (error) {
        console.log("ERR", error.message)
    }

    res.json({ data: cartData })
}

const getCartDetails = async (req, res) => {
    const { cartId } = req.body;

    try {
        var cartData = await cart.findOne({
            where: {
                id: cartId
            },
            attributes: ['id', 'customerID'],
            include: [{
                model: products, as: 'Products'
            }]
        })
    } catch (error) {
        console.log(error.message)
    }
    // var cartProduct = cartData.map(async (selectData) => {
    // console.log(selectData.dataValues, "cart dat a valuesd ")
    // return await products.findOne({ where: { id: selectData.dataValues.ProductId } })
    // }
    // )
    // var resolved = await Promise.all(cartProduct)
    // console.log(resolved, "resolved")

    res.json({ data: cartData })
}

const deleteFromCart = async (req, res) => {
    try {
        const data = await cart.destroy({ where: { id: req.params.id } })
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data: data })
}

module.exports = {
    addToCart,
    getCartDetails,
    deleteFromCart
}