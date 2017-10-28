var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
var server_port = 8080;
// var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

process.env.TZ = 'Asia/Kolkata';
var config = {
    development: {
        root: rootPath,
        app: {
            name: 'Foodie App'
        },
        port: server_port,
        db: 'mongodb://myadsadmin:myadsadmin@ds147900.mlab.com:47900/adstrackapp',
        // db: 'mongodb://localhost/foodie',
        REFRESH_THRESHOLD:1000*60*1
    },

    test: {
        root: rootPath,
        app: {
            name: 'Foodie App'
        },
        port: server_port,
        db: 'mongodb://myadsadmin:myadsadmin@ds147900.mlab.com:47900/adstrackapp',
        REFRESH_THRESHOLD:1000*60*10
    },

    production: {
        root: rootPath,
        app: {
            name: 'Foodie App'
        },
        port: server_port,
        db: 'mongodb://myadsadmin:myadsadmin@ds147900.mlab.com:47900/adstrackapp',
        REFRESH_THRESHOLD:1000*60*10
    }
};
console.log("Env=%s",env)
console.log(config[env])
module.exports = config[env];
