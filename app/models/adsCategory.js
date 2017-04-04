var mongoose = require('mongoose');
schema = mongoose.Schema;

var adsCategorySchema = new schema({
    advertiseMode:String,
    advertiseName:String
})

mongoose.model('adsCategory', adsCategorySchema);