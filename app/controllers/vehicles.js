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
    vehicles = mongoose.model('vehicles')

module.exports = function (app) {
    app.use('/', router);
    app.use(cors());
};

router.post('/newVehicles', function (req, res) {
    var newVehicles = new vehicles(req.body);
    newVehicles.save(function
        (err) {
        if (err) throw err;
        res.send(responseMsg.response('success', 'New Vehicles created !..'))
    })
})

router.post('/editVehicle', function (req, res) {
    var payload = req.body;
    vehicles.update({_id: payload._id},{$set :{vehicleNo:payload.vehicleNo, registrationNo : payload.registrationNo, driverId: payload.driverId}}, function (err, data) {
        res.send(data);
    })

})

router.get('/listVehicles', function (req, res) {
    vehicles.find({}).populate([{path:'projectId'},{path:'driverId'}]).exec(function (err, data) {
        res.jsonp(data)
    })
})
router.get('/vehicleDetail/:id', function (req, res) {
    vehicles.find({_id:req.params.id}).populate([{path:'projectId'},{path:'driverId'}]).exec(function (err, data) {
        res.jsonp(data)
    })
})
router.get('/vehicleNoById/:id', function (req, res) {
    console.log(req.params.id)
    vehicles.find({_id:req.params.id},{vehicleNo:1},function (err, data) {
        res.jsonp(data)
    })
})