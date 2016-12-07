// server.js

// import express ()
var express = require('express');		// npm install --save express
var app = express();

// import node.js http
var server = require('http').Server(app);

// import socket.io
var io = require('socket.io')(server);	// npm install --save socket.io

// import filesystem (aka fs)
var fs = require('fs');

//import twitter
var twitter = require('twitter');       // npm install --save twitter


/* ----------------------
  Twitter Configuration
-------------------------*/

// load configuration file with all secrets, etc.
var config_file = "./twitter_credentials.json";
var config = JSON.parse(fs.readFileSync(config_file, "utf8"));

// create the twitter client
var client = new twitter(config);

/*------------------------
  TWITTER FUNCTIONS
--------------------------*/

function search_twitter(keyword_value, nbr_hits) {


  //var twitter_search_params = {q: keyword_value, geocode: "37.781157,-122.398720,100mi"}; // <-- this is centered around a given region
  var twitter_search_params = {q: keyword_value, count: nbr_hits};

  client.get('search/tweets', twitter_search_params, function(error, tweets, response) {

    var results = [];

    //console.log(tweets);

    if(!error) {
      for(tweet of tweets.statuses) {

        if(tweet.user.location != null && tweet.user.location.trim().length > 0) {

          //console.log('-->' + tweet.user.location + '<--');

          results.push({tweet_text: tweet.text, location: tweet.user.location});

        }

      }

    } else {
      console.log('* ERROR *: ' + error);
    }

    // send results to client
    io.emit('search_twitter_results', results);   

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

  // (2) configure the connected socket to receive custom messages ('message from human')
  socket.on('search_twitter', function(msg) {

  	console.log('searching twitter with: ' + msg.toString());

    search_twitter(msg.keyword_value, msg.nbr_hits);

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

