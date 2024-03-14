const express = require('express')
const router = express.Router()

const cartController = require('../controllers/CartController.js');
const authJwt = require('../middlewares/AuthJwt.js');

router.post('/add-to-cart', cartController.addToCart)
router.get('/get-cartDetails', cartController.getCartDetails)
router.delete('/delete-from-Cart', authJwt, cartController.deleteFromCart)

module.exports = router;