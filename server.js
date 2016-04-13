var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


var configDB = require('./config/database.js');
app.set('superSecret', configDB.secret);
mongoose.connect(configDB.url);

app.use( express.static(__dirname+'/public'));


process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

app.get('/', function(req, res){
	res.sendFile('/index.html')
})
app.use(morgan('dev')); 
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.json()); // get information from html forms
        app.use(bodyParser.urlencoded({ extended: true }));
 
//require('./app/VendorRoutes.js')(app,vendor);
app.listen(port);

console.log('The server listening on ' + port);
