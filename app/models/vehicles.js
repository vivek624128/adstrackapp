var mongoose = require('mongoose');
schema = mongoose.Schema;

var vehiclesSchema = new schema({
    vehicleNo:String,
    registrationNo:String,
    authoriseId:[{ type: String, ref: 'users' }],
    driverId:[{ type: String, ref: 'users' }],
    vehicleType:String,
    projectId:String,
    assistantId:[{ type: String, ref: 'users' }],
    attachDate:String,
    vehicleDoc:String
})

mongoose.model('vehicles', vehiclesSchema);