// import express
var express = require('express');		// npm install --save express
var app = express();

// import node.js http
var server = require('http').Server(app);

// import socket.io
var io = require('socket.io')(server);	// npm install --save socket.io

// import filesystem (aka fs)
var fs = require('fs');

// import nodegram 
// https://github.com/zzarcon/nodegram
var Nodegram = require('nodegram');     // npm install --save nodegram

/* -----------------------------------
  Authetication (OAuth) Configuration
--------------------------------------*/

// access token use to autheticate with Instagram
var access_token = null;

// load configuration file with credentials, secrets, etc.
var config_file = "./instagram_credentials.json";
var config = JSON.parse(fs.readFileSync(config_file, "utf8"));

var options = {
	clientId: config.client_id,
  	clientSecret: config.client_secret,
  	redirectUri: 'http://localhost:8088/callback'
}

var gram = new Nodegram(options);

app.get('/auth', function authorize_user(req, res) {

	var uri = gram.getAuthUrl();
	res.redirect(uri);
});

app.get('/callback', function authorize_user(req, res) {

	gram.getAccessToken(req.query.code).then(function(resp) {
  		var token = resp.access_token;
  		access_token = token;
  		console.log(resp.user);
  		res.redirect('/');
	});

});

/*------------------------
  INSTAGRAM FUNCTIONS
--------------------------*/

function search_for_username(username, callback) {

    // example taken from https://github.com/zzarcon/nodegram

    var instagram = new Nodegram({accessToken: access_token});

    /* ----------------------------------
      This won't work unless you have 
      accounts are added to the app's
      sandbox -- re: give you permissions
    -------------------------------------*/

    instagram.get('/users/search', {q: username}).then(function(res, pag) {

      console.log('blablbalblalbalbla');

      console.log(res);

      callback(res);

    }).catch(function(err) {

      console.log(err);

    });

}

/* -------------------
	Configure Socket.io 
----------------------*/

// configure socket.io
// (1) when there is a connection 
io.on('connection', function(socket) {

  console.log('got a connection');

  // (2) configure the connected socket to receive custom messages ('message from human')
  socket.on('search_instagram', function(msg) {

  	console.log('searching instagram with: ' + JSON.stringify(msg));

    search_for_username(msg.user_id, function(results) {
      // send raw results
      io.emit('search_instagram_results', results);
    });

  });

  socket.on('disconnet', function() {

  	console.log('got a disconnection');
  	
  });

});

/* ------------------------------------
  Main entry point for the server
----------------------------------------*/

app.get('/', function(req, res) {
  // we the client is not authenticated yet, redirect to /auth (see line: 37)
	if(access_token === null) {
		res.redirect('/auth');
	} 
  // if already autheticated serve index.html
  else {
		res.sendFile(__dirname + '/index.html');
	}
});

/* -------------------
	Start the server
----------------------*/

// listen to connection on port 8088 --> http://localhost:8088
server.listen(8088, function () {
	console.log('listening on port: ' + 8088);
});