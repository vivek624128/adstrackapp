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
    ads = mongoose.model('users'),
    users = mongoose.model('ads'),
    adsCategory = mongoose.model('adsCategory'),
    userType = mongoose.model('usersType');

module.exports = function (app) {
    app.use('/', router);
    app.use(cors());
};

router.post('/newAdsCategory', function (req, res) {
    var newAdsCategory = new adsCategory(req.body);
    newAdsCategory.save(function
        (err) {
        if (err) throw err;
        res.send(responseMsg.response('success', 'New Ads Category created !..'))
    })
})
router.get('/listAdsCategory', function (req, res) {
    adsCategory.find({}, function (err, data) {
        res.send(data)
    })
})
router.get('/userList', function (req, res) {
    users.find({}, function (err, data) {
        res.send(data)
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
