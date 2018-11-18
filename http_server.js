// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var Class = require('./modules/class');
var config = require('./config');
var path = require('path');

// Initialize the server
var app = express();


// Middleware
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));


// Start the server and get the database running
app.use(express.static(__dirname+"/public"));
var server = app.listen(config.port, function(error) {
	if (error) {
		console.log("Error Listening to the connection")
	}

	mongoose.Promise = global.Promise;
	mongoose.connect(config.db_url, {useNewUrlParser: true});
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, "MongoDB connection error"));
    
    db.once('open', () =>{
	    console.log("Connected to the Mongo Database");
	    console.log("Listening to the connections at %s:%s", config.base_url, config.port);
    })
});
