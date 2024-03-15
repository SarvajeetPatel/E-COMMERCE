const express = require('express')
const router = express.Router()

const imageController = require('../controllers/ProductImagesCtrl')
router.post('/add-images', imageController.upload , imageController.addImage)
// router.post('/add-images', imageController.upload , imageController.addProductImages)

module.exports = router;