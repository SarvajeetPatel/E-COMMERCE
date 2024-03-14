const express = require('express')
const router = express.Router()

const imageController = require('../controllers/ProductImagesCtrl')
router.post('/add-images', imageController.upload , imageController.addImage)

module.exports = router;