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
    users = mongoose.model('users'),
    campaign = mongoose.model('campaign'),
    adsCategory = mongoose.model('adsCategory'),
    userType = mongoose.model('usersType');

module.exports = function (app) {
    app.use('/', router);
    app.use(cors());
};

router.post('/newCampaign', function (req, res) {
    var newCampaign = new campaign(req.body);
    newCampaign.save(function
        (err) {
        if (err) throw err;
        res.send(responseMsg.response('200', 'success', 'New Campaign created !..'))
    })
})
router.get('/listCampaign', function (req, res) {
    campaign.find({}).populate([{path: 'projectId'}, {path: 'campaignType'}, {path: 'campaign.vehicleId'}, {path: 'campaign.user'}]).exec(function (err, data) {
        res.jsonp(data)
    })
})
router.get('/listCampaignById/:id', function (req, res) {
    campaign.find({_id: req.params.id}).populate([{path: 'projectId'}, {path: 'campaignType'}]).exec(function (err, data) {
        res.jsonp(data)
    })
})


router.post('/linkVehicle', function (req, res) {
    console.log(req.body)
    var userId = req.body.data.user;
    var campId = req.body.campaignId;
    var campDetail = {
        campaignAlotted: campId
    }
    campaign.update({_id: req.body.campaignId}, {$push: {campaign: req.body.data}}, function (err, data) {
        users.update({_id: userId}, {$push: {campaign: campDetail}}, function (data) {
            console.log();
        })
        res.jsonp(data)
    })
})

router.post('/addCampaignFeeds', function (req, res) {
    var data = req.body();
    campaign.update({_id: data.campId, 'campaign.user':data.userId}, {$push: {'campaign.$.updates': data.updates}}, function (err, data) {
        res.jsonp(data)
    })
})
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
