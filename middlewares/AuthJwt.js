var db = require('../models');
var tokenTable = db.Token;

async function AuthJwt(req, res, next) {
    const AuthToken = req.headers;
    const { id } = req.body;

    const data = await tokenTable.findOne({
        where: {
            token: AuthToken,
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