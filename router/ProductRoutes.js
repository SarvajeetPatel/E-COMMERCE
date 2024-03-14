const express = require('express')
const router = express.Router()

const productController = require('../controllers/ProductController.js');
const adminLogin = require('../middlewares/adminLogin.js');
const authJwt = require('../middlewares/AuthJwt.js');

router.post('/add-products', productController.addProducts)
router.get('/get-all-products', authJwt, productController.getAllProducts)
router.get('/get-product/:id', adminLogin, productController.getProductByID)
router.patch('/edit-products/:id', adminLogin, productController.editProducts)
router.delete('/delete-product/:id', adminLogin, productController.deleteProduct)

module.exports = router;