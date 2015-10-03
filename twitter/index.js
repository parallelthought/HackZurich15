var Twitter = require('twitter');
var http = require('http');


 var client = new Twitter({
 consumer_key: process.env.TWITTER_CONSUMER_KEY,
 consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
 access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
 access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
 });


var send_tweet = function (name) {
  console.log("sent tweet for " + name + "!");
  client.post('statuses/update', {status: name + ' is happy now :)'}, function (error, tweet, response) {
    if (error) {
      console.log(error);
    }
    console.log(tweet);  // Tweet body.
  });
};

send_tweet("test");
var tweet_threshold = 200;
var lastValues = {};


var callback = function (response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var data = JSON.parse(str).sensors;
    data.forEach(function (elm) {
      lastValues[elm.id] = lastValues[elm.id] || [];
      lastValues[elm.id].push(elm.soil_moisture);
      if (lastValues[elm.id].length > 5) {
        lastValues[elm.id].pop();
      }
      //console.log(elm.id, lastValues[elm.id]);
      if (lastValues[elm.id][lastValues[elm.id].length - 1] - lastValues[elm.id][0] > tweet_threshold) {
        send_tweet(elm.id);
      }
    })
  });
};

var check = function () {
  try {
    http.request({
      host: 'mosturizer.cloudapp.net',
      port: 8080,
      path: '/backend/'
    }, callback).end();
  } catch (e) {
    console.log("tried connecting to cloudapp");
    console.log(e);
  }

};

setInterval(check, 1000);