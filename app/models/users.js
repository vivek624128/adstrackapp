var mongoose = require('mongoose');
schema = mongoose.Schema;

var usersSchema = new schema({
    userType : [{ type: String, ref: 'usersType' }],
    username : String,
    password : String,
    dateTime : Date,
    fullName : String,
    contactNo : String,
    emailId : String,
    Address : String,
    state : String,
    district : String,
    block : String,
    postalCode : String,
    aadharNo : String,
    panNo : String,
    profilePic : String,
    aadharCopy : String,
    advertiseId : String,
    driverLicense : String,
    driverLicenseDoc : String,
    permission: String
})

mongoose.model('users', usersSchema);