const express = require('express')
const router = express.Router()

const productController = require('../controllers/ProductController.js');
const adminLogin = require('../middlewares/adminLogin.js');
const authJwt = require('../middlewares/AuthJwt.js');

router.post('/add-products', productController.addProducts)
router.get('/get-all-products', authJwt, productController.getAllProducts)
router.post('/get-user-products', productController.getUserProducts)
router.get('/get-product/:id', productController.getProductByID)
router.post('/edit-products/:id', productController.editProducts)
router.delete('/delete-product/:id', productController.deleteProduct)

module.exports = router;