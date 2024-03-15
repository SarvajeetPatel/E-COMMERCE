const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('./models')
const app = express()
app.use(bodyParser.json())
app.use(cors())

const users = require('./router/UserRoutes.js')
app.use("/user", users)

const products = require('./router/ProductRoutes.js')
app.use("/product", products)

const cart = require('./router/CartRoutes.js')
app.use("/cart", cart)

const image = require('./router/ImageRoutes.js')
app.use("/image", image)
app.use('/uploads', express.static('./uploads'))

app.listen(8080, () => {
    console.log('App will Run on port 8080')
})