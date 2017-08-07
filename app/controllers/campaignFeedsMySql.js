var mysql = require('mysql'),
    express = require('express'),
    router = express.Router(),
    cors = require('cors'),
    moment = require('moment')
    mongoose = require('mongoose'),
    users = mongoose.model('users');
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

var campaignFeedsSchema = {
    feedsId: 'VARCHAR(255) DEFAULT NULL',
    userId: 'VARCHAR(255) DEFAULT NULL',
    vehicleId: 'VARCHAR(255) DEFAULT NULL',
    latitude: 'VARCHAR(255) DEFAULT NULL',
    longitude: 'VARCHAR(255) DEFAULT NULL',
    address: 'VARCHAR(255) DEFAULT NULL',
    caption: 'VARCHAR(255) DEFAULT NULL',
    updatedOn: 'DATETIME DEFAULT NULL',
    updateStatus: 'VARCHAR(255) DEFAULT NULL'
}



router.get('/createCampaignFeedsTable', function (req, res) {


    var campaignFeedFiled = [];
    for(keys in campaignFeedsSchema){
        console.log(keys)
        campaignFeedFiled.push(keys +' '+campaignFeedsSchema[keys]);
    }
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE campaignFeeds (" + campaignFeedFiled + ")";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
            res.send("Table created")
        });
    });
})
/*
router.post('/saveUser', function (req, res) {
    var usersList = [];
    var counter = 0;
    for(keys in usersSchema){
        console.log(keys)
        usersList.push(usersSchema[keys]);
    }
    res.send(usersList)

   users.find({}, function (err, data) {/!*
        for(var i = 0; i< data.length; i++){
            console.log(data[i]);
            var userData = [data[i]._id != null ?data[i]._id : '',
                data[i].userType[0] != null ?data[i].userType[0] : '',
                data[i].username != null ?data[i].username : '',
                data[i].password != null ?data[i].password : '',
                data[i].dateTime != null ?data[i].dateTime : '',
                data[i].fullName != null ?data[i].fullName : '',
                data[i].contactNo != null ?data[i].contactNo : '',
                data[i].emailId != null ?data[i].emailId : '',
                data[i].Address != null ?data[i].Address : '',
                data[i].state != null ?data[i].state : '',
                data[i].district != null ?data[i].district : '',
                data[i].block != null ?data[i].block : '',
                data[i].postalCode != null ?data[i].postalCode : '',
                data[i].aadharNo != null ?data[i].aadharNo : '',
                data[i].panNo != null ?data[i].panNo : '',
                data[i].profilePic != null ?data[i].profilePic : '',
                data[i].aadharCopy != null ?data[i].aadharCopy : '',
                data[i].advertiseId != null ?data[i].advertiseId : '',
                data[i].driverLicense != null ?data[i].driverLicense : '',
                data[i].driverLicenseDoc != null ?data[i].driverLicenseDoc : '',
                data[i].permission != null ?data[i].permission : ''];
            usersList.push(userData);
            if(i == data.length - 1){
                connection.connect(function (err) {
                    if (err) throw err;
                    console.log("Connected!");
                    var sql = "INSERT INTO users (" + userKey + ") VALUES ?";
                    connection.query(sql, [usersList], function (err, result) {
                        if (err) throw err;
                        console.log("Number of records inserted: " + result.affectedRows);
                    });
                });
            }
        }
*!/
        res.send(data.length)
    })

})*/