var db = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

var user = db.User
var tokenTable = db.Token
var cart = db.Cart;

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        var data = await user.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            userType: userType
        })
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data });
}

const getAllUsers = async (req, res) => {
    try {
        var data = await user.findAll({});
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const data = await user.findOne({ where: { email: email } })

    try {
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
    } catch (error) {
        console.log(error.message)
    }
    // delete data.password;
    console.log(data.dataValues.password, "data", data.password)
    res.json({ accessToken: token, cartId, data })
}

const getUserByID = async (req, res) => {
    try {
        const data = await user.findOne({ where: { id: req.params.id } })
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

const deleteUsers = async (req, res) => {
    try {
        const data = await user.destroy({ where: { id: req.params.id } })
    } catch (error) {
        console.log(error.message)
    }
    res.json({ data })
}

module.exports = {
    registerUser,
    getAllUsers,
    loginUser,
    deleteUsers,
    getUserByID
}