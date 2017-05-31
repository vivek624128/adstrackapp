/**
 * Created by Vivek Kumar on 19/12/2015.
 */
var express = require('express'),
    router = express.Router(),
    moment = require('moment'),
    mongoose = require('mongoose'),
    random = require('random-number'),
    passwoid = require('passwoid'),
    md5 = require('md5'),
    fs = require('fs'),
    responseMsg = require('../helper/responseLibrary'),
    sendMail = require('../helper/sendMail'),
    smaHelper = require('../helper/smsHelper'),
    cors = require('cors'),
    config = require('../../config/config.js'),
    users = mongoose.model('users');
    userType = mongoose.model('usersType');

module.exports = function (app) {
    app.use('/', router);
    app.use(cors());
};

router.post('/newUser', function (req, res) {
    var newUser = new users(req.body);
    newUser.dateTime =moment().format();
    var password = passwoid(6);
    newUser.password =md5(password);
    newUser.save(function
        (err) {
        if (err) throw err;
        // sendMail.sendMail(newUser, password);
        smaHelper.sendOTP(newUser.contactNo, newUser.username, password);
        res.send(responseMsg.response('success', 'New User created !..'))
    })
})

router.get('/userList', function (req, res) {
    users.find({}, function (err, data) {
        res.jsonp(data)
    })
})
router.put('/editUser', function (req, res) {
    var data = req.body;
    users.update({_id:data._id},{$set : {fullName:data.fullName, contactNo:data.contactNo,emailId:data.emailId,Address:data.Address,state:data.state,district:data.district,block:data.block,postalCode:data.postalCode,aadharNo:data.aadharNo,panNo:data.panNo}}, function (err, data) {
        res.send(data)
    })
})
router.put('/changePassword', function (req, res) {
    var data = req.body;
    // var oldPassword = md5(data.oldPassword);
    var newPassword = md5(data.newPassword);

    console.log(data)

    // console.log(oldPassword +' ----------- '+ newPassword)
    users.find({username:data.username}, function (err, response) {
        if(response!=''){
            users.update({username :data.username},{$set : {password:newPassword}}, function (err, data) {


                console.log(data)

                res.send("New Password Successfully changed !!...")
            })
        }
        else{
            res.send("User Id / Old Password Not matched")
        }
    })
})
router.get('/userList', function (req, res) {
    users.find({}, function (err, data) {
        res.jsonp(data)
    })
})

router.get('/removeUser/:id', function (req, res) {
    users.remove({_id: req.params.id}, function (err, data) {
        res.jsonp("data deleted")
    })
})

router.get('/userList/select/:userType?', function (req, res) {
    users.find({},{_id:1, fullName:1, username:1, userType:1}, function (err, data) {
        res.jsonp(data)
    })
})

router.post('/newUserType', function (req, res) {
    var newUserType = new userType(req.body);
    newUserType.save(function
        (err) {
        if (err) throw err;
        res.send(responseMsg.response('success', 'New User created !..'))
    })


})

router.get('/listUserType', function (req, res) {
    userType.find({}, function (err, data) {
        if (err) throw err;
        res.send(data);
    })
})


router.get('/sendMail', function (req, res) {
    var data = {
        emailId:'vivek9593@yahoo.in',
        username:'vivekKumar'
    }
    sendMail.sendMail(data,'abcdef');
    res.send("sent")
})



router.post('/login/authenticate', function (req, res) {
    console.log(req.body)
    var permission =req.body.permission;
    users.find({username:req.body.userId, password:md5(req.body.password)},{_id:1,username:1, permission:1, campaign:1, fullName:1, emailId:1, userType:1}).exec(function (err, data) {
        if (err) throw err;
        console.log(data)
        if(data.length>0){
            if(data[0].permission == permission){
                res.send(  responseMsg.response('200','Success', data));
            }
            else{
                res.send( responseMsg.response('301','Not Authorised', "No Authorization"));
            }

        }
        else{
            res.send( responseMsg.response('401','Failed', "Username/Password not valid"));
        }

    })
})
