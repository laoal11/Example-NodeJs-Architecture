// dummy function. in case we ever implement accounts
async function authenticate(req,res,next) {
    var cookie = req.cookies['auth'];
    if(cookie == undefined){
        return res.sendStatus(403);
    }    
    req.baseUrl += '.html';
    return next();
}

module.exports = {
    authenticate: authenticate
}