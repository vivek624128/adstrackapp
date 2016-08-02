/**
 * Created by Vivek Kumar on 19/12/2015.
 */
var express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    mongoose = require('mongoose')
var cors = require('cors');
var config = require('../../config/config.js');
var fs = require('fs');
var request = require("request");
module.exports = function (app) {
    app.use('/', router);
    app.use(cors());
};

router.get('/slider', function (req, res) {

    var options = {
        method: 'POST',
        url: 'http://indianonlinenews.com/Default.aspx/LoadSlider',
        headers: {
            accept: 'application/json',
            'content-type':'application/json'
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
    });

})
