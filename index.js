var http = require('http');
var express = require('express');
const mongoose  = require('./database/mongoose');  

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requestd-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.static(__dirname + '/public'));


var server = http.createServer(app);
server.listen(3000);
console.log('node running at' + 3000);