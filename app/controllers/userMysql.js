var mysql = require('mysql'),
    express = require('express'),
    router = express.Router(),
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

router.post('/userTable', function (req, res) {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    });
})