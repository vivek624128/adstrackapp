var mongoose = require('mongoose');
schema = mongoose.Schema

var usersTypeSchema = new schema({
    userType:String
})

mongoose.model('usersType', usersTypeSchema);