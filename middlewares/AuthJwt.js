var db = require('../models');
var tokenTable = db.Token;

async function AuthJwt(req, res, next) {
    const {authorization} = req.headers;
    const { id } = req.body;

    const data = await tokenTable.findOne({
        where: {
            token: authorization.slice(7),
            userId: id
        }
    });

    if (!data) {
        res.send('Authorization Failed');
    } else {
        next();
    }
}

module.exports = AuthJwt;