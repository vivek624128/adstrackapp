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

var usersSchema = {
    userId : 'VARCHAR(255) DEFAULT NULL',
    userType : 'VARCHAR(255) DEFAULT NULL',
    username : 'VARCHAR(255) DEFAULT NULL',
    password : 'VARCHAR(255) DEFAULT NULL',
    dateTime : 'date DEFAULT NULL',
    fullName : 'VARCHAR(255) DEFAULT NULL',
    contactNo : 'VARCHAR(255) DEFAULT NULL',
    emailId : 'VARCHAR(255) DEFAULT NULL',
    Address : 'VARCHAR(255) DEFAULT NULL',
    state : 'VARCHAR(255) DEFAULT NULL',
    district : 'VARCHAR(255) DEFAULT NULL',
    block : 'VARCHAR(255) DEFAULT NULL',
    postalCode : 'VARCHAR(255) DEFAULT NULL',
    aadharNo : 'VARCHAR(255) DEFAULT NULL',
    panNo : 'VARCHAR(255) DEFAULT NULL',
    profilePic : 'VARCHAR(255) DEFAULT NULL',
    aadharCopy : 'VARCHAR(255) DEFAULT NULL',
    advertiseId : 'VARCHAR(255) DEFAULT NULL',
    driverLicense : 'VARCHAR(255) DEFAULT NULL',
    driverLicenseDoc : 'VARCHAR(255) DEFAULT NULL',
    permission: 'VARCHAR(255) DEFAULT NULL'
}



router.get('/userTable', function (req, res) {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE customers (" + userSchema + ")";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
            res.send("Table created");
            connection.end();
        });
    });
})

router.post('/saveUser', function (req, res) {
    var usersList = [];
    var counter = 0;
    for(keys in usersSchema){
        console.log(keys)
        usersList.push(usersSchema[keys]);
    }
    res.send(usersList)

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
                        connection.end();
                    });
                });
            }
        }

        res.send(data.length)
    })

})
