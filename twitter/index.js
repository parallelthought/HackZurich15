var Twitter = require('twitter');
var http = require('http');
var util = require('util');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// cuz we're lazy
var props = {
  '1b0033000a47343138333038': {name: 'Jacaranda', lastTweet: 0},
  '24002d000447343337373738': {name: 'Lilly', lastTweet: 0},
  '430039000947343337373738': {name: 'Rosemary', lastTweet: 0},
  '38003d000b47343138333038': {name: 'Yasmine', lastTweet: 0}
};

var tweets = [
  "%s is a happy plant! #HackZurich",
  "You added water to %s and have now a happy plant! #HackZurich",
  "Aah, %s thanks you for the water. #HackZurich"
];

var measure_threshold = 200;
var tweet_threshold = 20 * 1000; // milliseconds

var send_tweet = function (id) {
  var name = props[id].name;

  if ((new Date()).getTime() - (props[id].lastTweet) < tweet_threshold) return;

  console.log("sent tweet for " + name + "!");

  var item = tweets[Math.floor(Math.random() * tweets.length)];

  client.post('statuses/update', {status: util.format(item, name)}, function (error, tweet, response) {
    if (error) {
      console.log(error);
    }
    props[id].lastTweet = (new Date()).getTime();
    //console.log(tweet);  // Tweet body.
  });
};

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
      props[elm.device_id].lastValues = props[elm.device_id].lastValues || [];
      props[elm.device_id].lastValues.unshift(parseInt(elm.soil_moisture));
      if (props[elm.device_id].lastValues.length > 5) {
        props[elm.device_id].lastValues.pop();
      }
      console.log(elm.device_id, props[elm.device_id].lastValues);
      if ((props[elm.device_id].lastValues[props[elm.device_id].lastValues.length - 1] - props[elm.device_id].lastValues[0]) > measure_threshold) {
        send_tweet(elm.device_id);
      }
    })
  });
};

var check = function () {
  var req = http.request({
    host: 'mosturizer.cloudapp.net',
    port: 8080,
    path: '/backend/state/'
  }, callback);


  req.on('error', function (err) {
    console.log(err);
  });

  req.end();
};

setInterval(check, 1000);
