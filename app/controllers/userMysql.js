var mysql = require('mysql'),
    express = require('express'),
    router = express.Router(),
    cors = require('cors'),
    moment = require('moment');
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



router.get('/userTable', function (req, res) {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE customers ("+userSchema+")";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
            res.send("Table created")
        });
    });
})