var mongoose = require('mongoose');
schema = mongoose.Schema;

var projectsSchema = new schema({
    projectName :String,
    advertiseCategory :[{ type: String, ref: 'adsCategory' }],
    advertiseLocations :String,
    startDate :Date,
    endDate :Date,
    projectManager :[{ type: String, ref: 'users' }],
    creationDate :Date,
    projectStatus :String
})

mongoose.model('projects', projectsSchema);