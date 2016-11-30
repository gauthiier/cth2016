// server.js

// import express ()
var express = require('express');		// npm install --save express
var app = express();

// import node.js http
var server = require('http').Server(app);

// import socket.io
var io = require('socket.io')(server);	// npm install --save socket.io

// import socket.io
var pos = require('pos');               // npm install --save pos

function tag_text(text) {
  var words = new pos.Lexer().lex(text);
  var tagger = new pos.Tagger();
  return tagger.tag(words);
}

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
  socket.on('request tag text', function(msg) {

    // send back tagged text
  	io.emit('tagged text', tag_text(msg));

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

