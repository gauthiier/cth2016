// server.js

// import express ()
var express = require('express');		// npm install --save express
var app = express();

// import node.js http
var server = require('http').Server(app);

// import socket.io
var io = require('socket.io')(server);	// npm install --save socket.io

// import natural
var natural = require('natural');

function measure_term(term, array_documents, callback) {

  var tfidf = new natural.TfIdf();

  for(var doc of array_documents) {

    tfidf.addDocument(doc);

  }

  var measures = [];

  tfidf.tfidfs(term, function(i, m) {

    measures.push(m);

    if(i == array_documents.length - 1) {

      callback(measures);

    }

  });

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
  socket.on('measure term', function(msg) {

    measure_term(msg.term, msg.documents, function(measures) {
      io.emit('term results', { term: msg.term, measures: measures});
    });  	

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

