const express = require('express');
const bodyParser = require('body-parser');
require('./models')
const app = express()
app.use(bodyParser.json())

const users = require('./router/UserRoutes.js')
app.use("/user", users)

const products = require('./router/ProductRoutes.js')
app.use("/product", products)

const cart = require('./router/CartRoutes.js')
app.use("/cart", cart)

app.listen(8080, () => {
    console.log('App will Run on port 8080')
})