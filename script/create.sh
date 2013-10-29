#!/bin/sh

mkdir control view service

echo "var excelsior = require('excelsior');" >> app.js
echo "excelsior.startServer("0",8000, __dirname);" >> app.js
