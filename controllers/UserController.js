var db = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

var user = db.User
var tokenTable = db.Token
var cart = db.Cart;

var registerUser = async (req, res) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await user.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        userType: userType
    })
    res.json({ data: data });
}

var getAllUsers = async (req, res) => {
    const data = await user.findAll({});
    res.json({ data: data })
}

var loginUser = async (req, res) => {
    const { email, password } = req.body;
    const data = await user.findOne({ where: { email: email } })

    if (!data) {
        res.json({ error: 'Authentication failed' })
    }
    else {
        var matchPassword = await bcrypt.compare(password, data.password)
        if (!matchPassword) {
            res.json({ error: 'Authentication failed' })
        }
    }

    if (data && matchPassword) {
        var token = jwt.sign({ email: email }, 'your-secret-key')
        await tokenTable.create({ token: token, userId: data.id })
        var cartId = await cart.create({ customerID: data.id })
    }
    res.json({ accessToken: token, cartID: cartId})
}

var getUserByID = async (req, res) => {
    const data = await user.findOne({ where: { id: req.params.id } })
    res.json({ data: data })
}

var deleteUsers = async (req, res) => {
    const data = await user.destroy({ where: { id: req.params.id } })
    res.json({ data: data })
}

module.exports = {
    registerUser,
    getAllUsers,
    loginUser,
    deleteUsers,
    getUserByID
}