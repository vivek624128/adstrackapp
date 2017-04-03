/**
 * Created by Vivek Kumar on 19/12/2015.
 */
var express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    mongoose = require('mongoose'),
    random = require('random-number'),
    fs = require('fs'),
    responseMsg = require('../helper/responseLibrary'),
    cors = require('cors'),
    config = require('../../config/config.js'),
    users = mongoose.model('users');
    userType = mongoose.model('usersType');

module.exports = function (app) {
    app.use('/', router);
    app.use(cors());
};

router.post('/newUser', function (req, res) {
    var newUser = new users(req.body);
    newUser.save(function
        (err) {
        if (err) throw err;
        res.send(responseMsg.response('success', 'New User created !..'))
    })


})

router.post('/newUserType', function (req, res) {
    var newUserType = new userType(req.body);
    newUserType.save(function
        (err) {
        if (err) throw err;
        res.send(responseMsg.response('success', 'New User created !..'))
    })


})

router.get('/selectUserType', function (req, res) {
    userType.find({}, function (err, data) {
        if (err) throw err;
        res.send(data);
    })
})
