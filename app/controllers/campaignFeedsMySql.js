var mysql = require('mysql'),
    express = require('express'),
    router = express.Router(),
    cors = require('cors'),
    moment = require('moment')
    mongoose = require('mongoose'),
    campaign = mongoose.model('campaign'),
    campaignsTill15July = mongoose.model('campaigns1')
    users = mongoose.model('users');
var connection = mysql.createConnection({
    host: 'mahaboudhilocation.com',
    user: 'mahaboud_vivek',
    password: 'Kinley@pure90',
    database: 'mahaboud_db'
});
/*
connection.connect(function (err) {
    console.log(err)
});*/

module.exports = function (app) {
    app.use('/', router);
    app.use(cors());
};

var campaignFeedsSchema = {
    feedsId: 'VARCHAR(255)',
    userId: 'VARCHAR(255)',
    campaignId: 'VARCHAR(255)',
    vehicleId: 'VARCHAR(255)',
    latitude: 'VARCHAR(255)',
    longitude: 'VARCHAR(255)',
    address: 'VARCHAR(255)',
    caption: 'VARCHAR(255)',
    updatedOn: 'DATETIME',
    updateStatus: 'VARCHAR(255)'
}
var campaignFeedFiled = [];
for (keys in campaignFeedsSchema) {
    campaignFeedFiled.push(keys + ' ' + campaignFeedsSchema[keys]);
}
/*


router.get('/createCampaignFeedsTable', function (req, res) {
        var sql = "CREATE TABLE campaignFeeds (" + campaignFeedFiled + ")";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
            res.send("Table created");
            connection.end();
        });
})

 */
router.post('/fetchCampaign', function (req, res) {
    var campaignFields = [];
    for (keys in campaignFeedsSchema) {
        campaignFields.push(keys);
    }
    var campaignFeeds = [];

    var data = req.body;
    var startDate = new Date(moment(data.startDate).startOf('day'));
    var endDate = new Date(moment(data.endDate).endOf('day'));
    console.log(startDate + " ------  " + endDate);
    var table = 'campaign';
    var date = moment("2017-07-15")
    var now = moment();
    if (date.diff(startDate, 'days') <= 0) {
        table = campaign;
    }
    else {
        table = campaignsTill15July;
    }
    table.aggregate(
        [
            {$unwind: "$campaign"}, {$unwind: "$campaign.updates"}, {$unwind: "$campaign.updates.location"},
            {$match: {'campaign.updates.updatedOn': {$gte: startDate, $lt: endDate}}},
            {
                $group: {
                    _id: {
                        'feedsId': '$campaign.updates._id',
                        'userId': '$campaign.user',
                        'campaignId': "$campaign._id",
                        'vehicleId': '$campaign.vehicleId',
                        'latitude': '$campaign.updates.location.latitude',
                        'longitude': '$campaign.updates.location.longitude',
                        'address': '$campaign.updates.location.address',
                        'caption': '$campaign.updates.location.caption',
                        'updateOn': '$campaign.updates.updatedOn',
                        'updateStatus': '$campaign.updates.updateStatus'
                    }
                }
            }
        ]).exec(function (err, data) {
            var counter =0;
                for(var i = 0; i< data.length; i++) {
                    var campaignFeed = [
                        data[i]._id.feedsId != null ? data[i]._id.feedsId : '',
                        data[i]._id.userId[0] != null ? data[i]._id.userId[0] : '',
                        data[i]._id.campaignId != null ? data[i]._id.campaignId : '',
                        data[i]._id.vehicleId[0] != null ? data[i]._id.vehicleId[0] : '',
                        data[i]._id.latitude != null ? data[i]._id.latitude : '',
                        data[i]._id.longitude != null ? data[i]._id.longitude : '',
                        data[i]._id.address != null ? data[i]._id.address : '',
                        data[i]._id.caption != null ? data[i]._id.caption : '',
                        data[i]._id.updateOn != null ? data[i]._id.updateOn : '',
                        data[i]._id.updateStatus != null ? data[i]._id.updateStatus : ''];

                    campaignFeeds.push(campaignFeed);
                    if(i == data.length-1){
                        var sql = "INSERT INTO campaignFeeds (" + campaignFields + ") VALUES ?";
                        connection.query(sql, [campaignFeeds], function (err, result) {
                            if (err) throw err;
                            res.send("Number of records inserted: " + result.affectedRows)
                            console.log("Number of records inserted: " + result.affectedRows);
                            connection.end();
                        });
                    }
                }
    })
})

router.get('/campaignFeeds/:startDate/:endDate', function (req, res) {
    var data = req.params;
    var startDate = moment(data.startDate).startOf('day').format();
    var endDate = moment(data.endDate).endOf('day').format();
    console.log(startDate + ' ------- ' + endDate)
    connection.query("SELECT * FROM `campaignFeeds` WHERE `updatedOn` BETWEEN '" + startDate + "' AND '" + endDate + "' ORDER BY `updatedOn` DESC", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.jsonp(result);
    });

})
router.get('/feedsByVehicleId/:startDate/:endDate/:vehicleId', function (req, res) {
    var data = req.params;
    var startDate = moment(data.startDate).startOf('day').format();
    var endDate = moment(data.endDate).endOf('day').format();
    var vehicleId = data.vehicleId;
    console.log(startDate + ' ------- ' + endDate)
    connection.query("SELECT * FROM `campaignFeeds` WHERE vehicleId = '"+vehicleId+"' AND `updatedOn` BETWEEN '" + startDate + "' AND '" + endDate + "' ORDER BY `updatedOn` DESC", function (err, result, fields) {
        if (err) throw err;
        res.jsonp(result);
    });
})
// connection.end();


