var mysql = require('mysql'),
    express = require('express'),
    router = express.Router(),
    cors = require('cors'),
    moment = require('moment')
    mongoose = require('mongoose'),
        campaign = mongoose.model('campaign');
var connection = mysql.createConnection({
    host: 'mahaboudhilocation.com',
    user: 'mahaboud_vivek',
    password: 'Kinley@pure90',
    database: 'mahaboud_db'
});
module.exports = function (app) {
    app.use('/', router);
    app.use(cors());
};

var campaignSchema = {
    campaignId: 'VARCHAR(255)',
    campaignName: 'VARCHAR(255)',
    startDate: 'DATETIME',
    endDate: 'DATETIME',
    projectId: 'VARCHAR(255)',
    campaignType: 'VARCHAR(255)',
    creationDate: 'DATETIME',
    status: 'VARCHAR(255)'
}



router.get('/createCampaignTable', function (req, res) {

    var campaignTabFiled = [];
    for(keys in campaignSchema){
        console.log(keys)
        campaignTabFiled.push(keys +' '+campaignSchema[keys]);
    }

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE campaign (" + campaignTabFiled + ")";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
            res.send("Table created");
            // connection.end();
        });
    });
})
// connection.end();

router.post('/copyCampaign', function (req, res) {
    var campaignFields = [];
    var counter = 0;
    var campaignData = [];
    for(keys in campaignSchema){
        console.log(keys)
        campaignFields.push(keys);
    }
    campaign.find({}, function (err, data) {
        for(var i = 0; i< data.length; i++){
            console.log(data[i]);
            var campaignData = [data[i]._id != null ?data[i]._id : '',
                data[i].campaignName != null ?data[i].campaignName : '',
                data[i].startDate != null ?data[i].startDate : '',
                data[i].endDate != null ?data[i].endDate : '',
                data[i].projectId[0]._id != null ?data[i].projectId[0]._id : '',
                data[i].campaignType[0]._id != null ?data[i].campaignType : '',
                data[i].creationDate != null ?data[i].creationDate : '',
                data[i].status != null ?data[i].status : ''];
            campaignData.push(campaignData);
            if(i == data.length - 1){
                connection.connect(function (err) {
                    if (err) throw err;
                    console.log("Connected!");
                    var sql = "INSERT INTO users (" + campaignFields + ") VALUES ?";
                    connection.query(sql, [campaignData], function (err, result) {
                        if (err) throw err;
                        console.log("Number of records inserted: " + result.affectedRows);
                    });
                });
            }
        }
        res.send(data.length)
    })

})