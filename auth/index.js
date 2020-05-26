const logger = require('../utils/logger')

// dummy function in case one ever wants to implement accounts
async function authenticate(req, res, next) {
    var cookie = req.cookies['auth'];
    console.log(req);
    if (cookie == undefined) {
        console.log(req.cookies)
        logger.debug("Someone unauthorized tried to reach an authorized resource")
        return res.sendStatus(403);
    }
    // add logic here
    return next();
}

module.exports = {
    authenticate: authenticate
}