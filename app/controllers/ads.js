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
    var data = {
        campId: '58e4bc42349f75240e120bce',
        userId: '58e4a61c8365777c1e2769c7',
        updates: {
            location: {
                latitude: '12.12345',
                longitude: '13.253668',
                address: 'Patna, Bihar-803303'
            },
            updatedOn: moment().format(),
            updateStatus: 'data:image/jpeg;base64,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'

        }
    }
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
