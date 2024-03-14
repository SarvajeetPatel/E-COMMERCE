const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController.js');
const adminLogin = require('../middlewares/adminLogin.js');
const authJwt = require('../middlewares/AuthJwt.js');

router.post('/register-users', userController.registerUser)
router.post('/login-user', userController.loginUser)
router.get('/get-all-users', adminLogin, authJwt, userController.getAllUsers)
router.get('/get-user/:id', adminLogin, authJwt, userController.getUserByID)
router.delete('/users/:id', adminLogin, authJwt, userController.deleteUsers)

module.exports = router;