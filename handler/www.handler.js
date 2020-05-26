const Router = require('express-promise-router')

const path = require('path');

const { ErrorHandler } = require('../utils/error')

const app = new Router();

const express = require('express');

//const authService = require('../auth/index')

module.exports = app;

app.use(express.static(path.resolve('www/resources/css')));
app.use(express.static(path.resolve('www/resources/js')));

app.use(express.static(path.resolve('www/public'), {
    extensions: ['html']
}));

// only authenticated user can access pages in the private folder
//app.use(authService.authenticate, express.static(path.resolve('www/private'),{index:false, extensions:['html']}));

app.use('/*', function (req, res) {
    throw new ErrorHandler(404, "Website " + req.originalUrl + " not found")
})