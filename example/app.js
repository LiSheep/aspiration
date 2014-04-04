//the service startup point

var excelsior = require('../lib/index');

// var excelsior = require("excelsior");

var port = process.argv[2];

excelsior.startServer("0",port, __dirname);