/**
 * Created by Flashbox on 6/30/2016.
 */

var request = require("request");

function sendOTP(mobileNo, otp, res) {
    var options = { method: 'GET',
        url: 'http://sms2.websupport.co.in/api/sendhttp.php',
        qs:
        { authkey: '2600ASSa9lSu57d380ef',
            mobiles: mobileNo,
            message: 'Dear User, Your verification code is '+otp+' . Please enter the code to proceed. Thank You, %0a Quotient ',
            sender: 'QUOTNT',
            route: '4',
            country: '0' },
        headers:
        { 'postman-token': '693318bb-32e7-db73-f88f-21cf9f3dd0cf',
            'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var otpResponse=[{
            "phoneNumber": mobileNo,
            "otpRequired": 'true'
        }]

//        res.send(otpResponse);
    });
}

function sendSMS(mobileNo, msg, res) {
    var options = { method: 'GET',
        url: 'http://sms2.websupport.co.in/api/sendhttp.php',
        qs:
        { authkey: '2600ASSa9lSu57d380ef',
            mobiles: mobileNo,
            message: msg,
            sender: 'QUOTNT',
            route: '4',
            country: '0' },
        headers:
        { 'postman-token': '693318bb-32e7-db73-f88f-21cf9f3dd0cf',
            'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var otpResponse=[{
            "phoneNumber": mobileNo,
            "otpRequired": 'true'
        }]

//        res.send(otpResponse);
    });
}

module.exports = {
    sendOTP: sendOTP,
    sendSMS: sendSMS
}
