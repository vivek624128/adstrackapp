var mongoose = require('mongoose');
schema = mongoose.Schema;

var billForVehicleSchema = new schema({
    vehicleId:[{ type: String, ref: 'vehicles' }],
    bills:[
        {
            billDate : Date,
            technicianName: String,
            district: String,
            vehicleRatePerKM: Number,
            totalBillAmount: Number,
            eventLocations:[
                {
                    location:String,
                    time : String,
                    totalRun : Number
                }
            ],
            enclosedDoc:[{
                docDetail: String
            }],
            remarks: String
        }
    ]
})

mongoose.model('billForVehicle', billForVehicleSchema);