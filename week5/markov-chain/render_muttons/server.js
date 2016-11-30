// server.js

// import express ()
var express = require('express');		// npm install --save express
var app = express();

// import node.js http
var server = require('http').Server(app);

// import socket.io
var io = require('socket.io')(server);	// npm install --save socket.io

// import file system (aka fs)
var fs = require('fs');

// import custom script
var fender_cottons = require('./render_muttons.js');


var text_file = "./TENDER_BUTTONS.txt";
var text = fs.readFileSync(text_file, "utf8");


/* ----------------------------------
	Server and Socket Configuration
--------------------------------------*/

// tell express to server our index.html file
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// configure socket.io
// (1) when there is a connection 
io.on('connection', function(socket) {

  console.log('got a connection');


  // (2) configure the connected socket to receive custom messages
  socket.on('request bare text', function(msg) {

    // read the file from memory
    var text_file = "./TENDER_BUTTONS.txt";
    var text = fs.readFileSync(text_file, "utf8");

    // send back its content
  	io.emit('bare text', text);

  });

  socket.on('request render muttons', function(msg) {

    console.log('rendering a mutton');
    
    try {
      // generate new text using custom script 'fender_cottons.js'
      var generated_text = fender_cottons.generate_text(msg.input, msg.nbr_verse, msg.min_score, msg.width_verses);
      // send back its content
      io.emit('render muttons', generated_text);      
    } catch (e) {
      io.emit('render muttons', e.toString());      
    }


  });

  socket.on('disconnet', function() {

  	console.log('got a disconnection');
  	
  });

});

/* -------------------
	Start the server
----------------------*/

// listen to connection on port 8088 --> http://localhost:8088
server.listen(8088, function () {
	console.log('listening on port: ' + 8088);
});

