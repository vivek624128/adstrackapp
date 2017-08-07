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

var userSchema = ['userType VARCHAR(255)',
    'username  VARCHAR(255)',
    'password  VARCHAR(255)',
    'dateTime  VARCHAR(255)',
    'fullName  VARCHAR(255)',
    'contactNo  VARCHAR(255)',
    'emailId  VARCHAR(255)',
    'Address  VARCHAR(255)',
    'state  VARCHAR(255)',
    'district  VARCHAR(255)',
    'block  VARCHAR(255)',
    'postalCode  VARCHAR(255)',
    'aadharNo  VARCHAR(255)',
    'panNo  VARCHAR(255)',
    'profilePic  VARCHAR(255)',
    'aadharCopy  VARCHAR(255)',
    'advertiseId  VARCHAR(255)',
    'driverLicense  VARCHAR(255)',
    'driverLicenseDoc  VARCHAR(255)',
    'permission  VARCHAR(255)']

var userKey = [
    'userId',
    'userType',
    'username',
    'password',
    'dateTime',
    'fullName',
    'contactNo',
    'emailId',
    'Address',
    'state',
    'district',
    'block',
    'postalCode',
    'aadharNo',
    'panNo',
    'profilePic',
    'aadharCopy',
    'advertiseId',
    'driverLicense',
    'driverLicenseDoc',
    'permission']


router.get('/userTable', function (req, res) {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE customers (" + userSchema + ")";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
            res.send("Table created")
        });
    });
})

router.post('/saveUser', function (req, res) {
    var usersList = [];
    users.find({}, function (err, data) {
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
                data[i].driverLicenseDoc != null ?data[i].driverLicenseDoc : ''];
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

        res.send(usersList)
    })

})