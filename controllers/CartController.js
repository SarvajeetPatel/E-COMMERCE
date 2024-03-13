var db = require('../models');
var cart = db.Cart;
var cart_product = db.cart_product;
var products = db.Product;

var addToCart = async (req, res) => {
    const { productId, cartId } = req.body;
    const data = await cart.findOne({ where: { id: cartId } })

    if (!data) {
        res.send('Cannot Add to Cart')
    }
    else {
        var cartData = await cart_product.create({ CartId: data.id, ProductId: productId })
    }
    res.json({ data: cartData })
}

var getCartDetails = async (req, res) => {
    const { userId, cartId } = req.body;
    const data = await cart.findOne({ where: { id: cartId, customerID: userId } })

    if (!data) {
        res.send('Check your Data')
    }
    else {
        var cartData = await cart_product.findAll({ where: { CartId: data.id }, attributes: ['CartId', 'ProductId'] })
        // var cartProduct = cartData.map(async (selectData) => {
        // console.log(selectData.dataValues, "cart dat a valuesd ")
        // return await products.findOne({ where: { id: selectData.dataValues.ProductId } })
        // }
        // )
        // var resolved = await Promise.all(cartProduct)
        // console.log(resolved, "resolved")

        var CartProducts = await products.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'user_ProID', 'orderID'] } });
        var finalProducts = cartData.map((prod) => (
            CartProducts.filter((endProduct) => endProduct.dataValues.id === prod.dataValues.ProductId)))
    }
    res.json({ data: finalProducts, cartId: cartData.CartId })
}

var deleteFromCart = async (req, res) => {
    const data = await cart.destroy({ where: { id: req.params.id } })
    res.json({ data: data })
}

module.exports = {
    addToCart,
    getCartDetails,
    deleteFromCart
}