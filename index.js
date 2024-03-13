const express = require('express');
const bodyParser = require('body-parser');
require('./models')
var userController = require('./controllers/UserController');
var productController = require('./controllers/ProductController.js');
var cartController = require('./controllers/CartController.js');
var adminLogin = require('./middlewares/adminLogin.js');
var authJwt = require('./middlewares/AuthJwt.js');

const app = express()
app.use(bodyParser.json())

app.post('/register-users', userController.registerUser)
app.post('/login-user', userController.loginUser)
app.get('/get-all-users', adminLogin, authJwt, userController.getAllUsers)
app.get('/get-user/:id', adminLogin, authJwt, userController.getUserByID)
app.delete('/users/:id', adminLogin, authJwt, userController.deleteUsers)

app.post('/add-products', adminLogin, productController.addProducts)
app.get('/get-all-products', authJwt, productController.getAllProducts)
app.get('/get-product/:id', adminLogin, productController.getProductByID)
app.patch('/edit-products/:id', adminLogin, productController.editProducts)
app.delete('/delete-product/:id', adminLogin, productController.deleteProduct)

app.post('/add-to-cart', authJwt, cartController.addToCart)
app.get('/get-cartDetails', authJwt, cartController.getCartDetails)
app.delete('/delete-from-Cart', authJwt, cartController.deleteFromCart)

app.listen(8080, () => {
    console.log('App will Run on port 8080')
})