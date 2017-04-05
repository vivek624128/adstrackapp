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
    users = mongoose.model('users'),
    projects = mongoose.model('projects'),
    userType = mongoose.model('usersType');

module.exports = function (app) {
    app.use('/', router);
    app.use(cors());
};

router.post('/newProject', function (req, res) {
    var newProject = new projects(req.body);
    newProject.save(function
        (err) {
        if (err) throw err;
        res.send(responseMsg.response('success', 'New project Created !..'))
    })
})
router.get('/projectList', function (req, res) {
    projects.find({}).populate([{path:'advertiseCategory'},{path:'projectManager'}]).exec( function (err, data) {
        res.jsonp(data)
    })
})