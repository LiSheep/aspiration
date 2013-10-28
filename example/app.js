//the service startup point

var excelsior = require('../lib/index');

// var excelsior = require("excelsior");

excelsior.startServer("0",8000, __dirname);