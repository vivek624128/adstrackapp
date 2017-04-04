var mongoose = require('mongoose');
schema = mongoose.Schema;

var adsSchema = new schema({
    adCategory:String,
    startDate: Date,
    endDate:Date,
    adLocation:Object,
    assignedTo:[{ type: String, ref: 'users' }],
    status:String,
    projectId:[{ type: String, ref: 'projects' }],
    vehicleId:[{ type: String, ref: 'vehicles' }],
    creationDate:Date,
    updates:[{
        location: [{
            latitude: String,
            longitude:String,
            address: String
        }],
        updatedOn: Date,
        updateStatus: String
    }]
})

mongoose.model('ads', adsSchema);