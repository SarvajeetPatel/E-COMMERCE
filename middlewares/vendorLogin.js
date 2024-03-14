function vendorLogin(req, res, next) {
    const { userType } = req.body;
    if (userType === 'vendor') {
        next()
    } else {
        res.send('No Auth')
    }
}
module.exports = vendorLogin;