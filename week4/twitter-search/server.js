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

function search_twitter(keyword_value, nbr_hits, filter_value, callback) {

  var search_params = {q: keyword_value, count: nbr_hits};

  // if there is a filter
  if(filter_value) {
    search_params.filter = filter_value;
  }

  client.get('search/tweets', search_params, function(error, tweets, response) {

    var results = [];

    if(!error) {
      //console.log("got " + tweets.statuses.length + " hits")
      for(tweet of tweets.statuses) {
        // console.log(tweet);
        let r = {};
        r.text = tweet.text;
        if(tweet.entities.media) {
          r.images = [];
          for(media of tweet.entities.media) {
            if(media.type == 'photo')         
              r.images.push(media.media_url);       
          }       
        }
        results.push(r);
      }

    } else {
      console.log('* ERROR *: ' + error);
    }

    // send results to client
    //io.emit('search_twitter_results', results);   

    callback(results);    

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
  //io.emit('message from robot', 'Hi! my name is Reihtuag!'); // greetings

  // (2) configure the connected socket to receive custom messages ('message from human')
  socket.on('search_twitter', function(msg) {

  	console.log('searching twitter with: ' + msg.toString());

    search_twitter(msg.keyword_value, msg.nbr_hits, msg.filter_value, function (results) {

      console.log(JSON.stringify(results, null, '\t'));

      io.emit('search_twitter_results', results);

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

