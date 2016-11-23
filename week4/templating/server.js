// server.js

// import express ()
var express = require('express');		// npm install --save express
var app = express();

// import node.js http
var server = require('http').Server(app);

// import socket.io
var io = require('socket.io')(server);	// npm install --save socket.io

var books = [
  {'title': "Ways of Curating",
   'author': "Hans Ulrich Orbist",
   'price': 16.95,
   'kind': "Paperback"
  },
  {'title': "Ardor",
   'author': "Roberto Calasso",
   'price': 39.50,
   'kind': "Hardcover"
  },
  {'title': "Why Grow Up?",
   'author': "Susan Neiman",
   'price': 15.95,
   'kind': "Paperback"
  },
  {'title': "The Complete Stories",
   'author': "Flannery O'connor",
   'price': 19.95,
   'kind': "Paperback"
  },
  {'title': "The Hatred of Poetry",
   'author': "Ben Lerner",
   'price': 13.95,
   'kind': "Paperback"
  }
];

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
  socket.on('give some books', function(msg) {

  	console.log('got a give some books: ' + msg);

  	io.emit('all the books we have', books);

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

