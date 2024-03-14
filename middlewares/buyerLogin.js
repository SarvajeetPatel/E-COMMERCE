function buyerLogin(req, res, next) {
    const { userType } = req.body;
    if (userType === 'buyer') {
        next()
    } else {
        res.send('No Auth')
    }
}
module.exports = buyerLogin;