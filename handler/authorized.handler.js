const Router = require('express-promise-router')

const api = new Router();

const logger = require('../utils/logger')

module.exports = api;

api.get('/', function (req, res) {
    logger.info("Authorized request received");
    return res.sendStatus(200);
})