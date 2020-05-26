const Router = require('express-promise-router')

const api = new Router();

const logger = require('../utils/logger')

const { ErrorHandler } = require('../utils/error')

module.exports = api;

api.get('/', function (req, res) {
    logger.info("Received request");
    logger.debug("Request received!!");
    return res.sendStatus(200);
})

api.post('/data', function (req, res) {
    logger.debug(JSON.stringify(req.body));
    return res.sendStatus(200);
})

// function to show how error handling works
api.get('/error', function (req, res) {
    logger.info("Received error request");
    let err;
    if (!err) {
        throw new ErrorHandler(500, "This is a default message")
    }
})

api.use('/', function (req, res) {
    logger.debug(req.originalUrl);
    throw new ErrorHandler(404, "Resource " + req.originalUrl + " not found")
})