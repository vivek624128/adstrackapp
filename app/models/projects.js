var mongoose = require('mongoose');
schema = mongoose.Schema;

var projectsSchema = new schema({
    projectName :String,
    advertiseCategory :Object,
    advertiseLocations :Object,
    startDate :Date,
    endDate :Date,
    projectManager :String,
    creationDate :Date,
    projectStatus :String
})

mongoose.model('projects', projectsSchema);