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
var request = require("request");

var ObjectID = require("mongodb").ObjectID;

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
    console.log(req.params)
    campaign.find({_id: req.params.id}).populate([{path: 'projectId'}, {path: 'campaign.vehicleId'}, {path: 'campaign.user'}]).exec(function (err, data) {
        res.jsonp(data)
    })
})

router.get('/removeCampaign/:id', function (req, res) {
    console.log(req.params)
    campaign.remove({_id: req.params.id}, function (err, data) {
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
    var data = req.body;
    console.log(data);
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



router.post('/feeds', function (req, res) {
    var data = req.body;
    var startDate=new Date(moment(data.startDate).startOf('day').utc());
    var endDate=new Date(moment(data.endDate).endOf('day').utc());
    campaign.aggregate(
        [
            {$unwind: "$campaign"},{$unwind: "$campaign.updates"},{$unwind: "$campaign.updates.location"},
            {$match: {'campaign.updates.updatedOn':{$gte : startDate, $lt: endDate}}},
            {
                $group: {
                    _id: {
                        'campaignId': "$campaign._id",
                        'vehicleId': '$campaign.vehicleId',
                        'updateOn':'$campaign.updates.updatedOn',
                        'locationData':{
                            'latitude':'$campaign.updates.location.latitude',
                            'longitude':'$campaign.updates.location.longitude',
                            'address':'$campaign.updates.location.address'
                        }
                    }
                }
            }
        ]).exec( function (err, orders) {
            res.send(orders)
        })

})


router.post('/saveImage', function (req, res) {
var url ='http://mahaboudhilocation.com/trackapp/saveImage.php';
    var postData={
        a:1,
        b:2
    };
    require('request').post({
        uri:url,
        headers:{'content-type': 'application/json'},
        body:JSON.stringify(postData)
    },function(err,response,body){
        console.log(body);
        res.send(body);
        console.log(response.statusCode);
    });
})

function saveFeedsImage(imageData) {

}



