var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/connect4');

var redis = require('redis');
var url = require('url');

exports.connectRedis = function() {
  var urlRedisToGo = process.env.REDISTOGO_URL;
  var client = {};

	if (urlRedisToGo) {
		console.log('using redistogo');
		rtg = url.parse(urlRedisToGo);
		client = redis.createClient(rtg.port, rtg.hostname);
		client.auth(rtg.auth.split(':')[1]);
  	} else {
    	console.log('using local redis');
   
    	client = redis.createClient();
  	}

  	return client;
};