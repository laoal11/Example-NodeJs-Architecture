const Router = require('express-promise-router');
const expressWinston = require("express-winston");

const logger = require('./utils/logger')

const apiHandler = require('./handler/api.handler');
const wwwHandler = require('./handler/www.handler')
const authorizedHandler = require('./handler/authorized.handler')

const apiRouter = new Router();
const wwwRouter = new Router();
const authorizedRouter = new Router();

const authService = require('./auth')

apiRouter.use(expressWinston.logger({
    winstonInstance: logger,
    level: "debug",
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "APIROUTER: HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    //expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

wwwRouter.use(expressWinston.logger({
    winstonInstance: logger,
    level: "debug",
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "WWWROUTER: HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    //expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

authorizedRouter.use(expressWinston.logger({
    winstonInstance: logger,
    level: "debug",
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "AUTHORIZEDROUTER: HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    //expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

apiRouter.use('/', apiHandler);
wwwRouter.use('/', wwwHandler);
authorizedRouter.use('/', authorizedHandler);

module.exports = (app) => {
    app.use('/api/', apiRouter),
        app.use('/admin/', authService.authenticate, authorizedRouter),
        app.use('/', wwwRouter)
}