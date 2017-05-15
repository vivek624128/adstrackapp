var mongoose = require('mongoose');
schema = mongoose.Schema;

var campaignSchema = new schema({
    campaignName: String,
    startDate: Date,
    endDate: Date,
    projectId: [{type: String, ref: 'projects'}],
    campaignType: [{type: String, ref: 'adsCategory'}],
    creationDate: Date,
    campaign: [
        {
            assignDate: Date,
            user: [{type: String, ref: 'users'}],
            vehicleId: [{type: String, ref: 'vehicles'}],
            updates: [{
                location: [{
                    latitude: String,
                    longitude: String,
                    address: String,
                    caption: String
                }],
                updatedOn: Date,
                updateStatus: String
            }]
        }
    ],
    status: String
})

mongoose.model('campaign', campaignSchema);