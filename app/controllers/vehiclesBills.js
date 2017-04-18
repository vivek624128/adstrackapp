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
    vehicles = mongoose.model('vehicles'),
    vehicleBill = mongoose.model('billForVehicle');

module.exports = function (app) {
    app.use('/', router);
    app.use(cors());
};

router.post('/vehicleBill', function (req, res) {
    var data = req.body;
    vehicleBill.find({'vehicleId': req.body.vehicleId}, {vehicleId: 1}, function (err, result) {
        console.log(result[0].vehicleId)
        if (result[0].vehicleId) {
            vehicleBill.update({vehicleId: req.body.vehicleId}, {$push: {bills: data.bills}}, function (err, updateResult) {
                console.log(updateResult);
                res.send(responseMsg.response('success', 'New Vehicles Bill is generated !..'))

            })
        }
        else {
            var newBill = new vehicleBill(req.body);
            newBill.save(function
                (err) {
                if (err) throw err;
                res.send(responseMsg.response('success', 'New Vehicles Bill is generated !..'))
            })
        }
    })

})

router.get('/vehicleBill/:id/:date', function (req, res) {

    var startDate = new Date(moment(req.params.date).startOf('day'));
    var endDate = new Date(moment(req.params.date).endOf('day'));
    console.log(startDate +" -------------- "+ endDate)
    vehicleBill.aggregate(
            [
                {$unwind: "$bills"},
                {$match: {vehicleId: req.params.id, 'bills.billDate': {$gte: startDate, $lt: endDate}}},
                {
                    $group: {
                        _id: {
                            'vehicleId': "$vehicleId",
                            "district": "$bills.district",
                            "vehicleRatePerKM": "$bills.vehicleRatePerKM",
                            "totalBillAmount": "$bills.totalBillAmount",
                            "technicianName": "$bills.technicianName",
                            "remarks": "$bills.remarks",
                            "billDate": "$bills.billDate",
                            "enclosedDoc":"$bills.enclosedDoc",
                            "eventLocations":"$bills.eventLocations"
                        }
                    }
                }
            ]).exec( function (err, orders) {
        res.jsonp(orders)
    })
})
