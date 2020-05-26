const Router = require('express-promise-router')

const path = require('path');

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
    console.log("User requested resource that does not exist");
    return res.sendStatus(404);
})