var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/connect4');

var passport = require('passport');
require('./models/User');

require('./config/passport');

app.set('config',config);
app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(passport.initialize());

var routes = require('./routes/index');
var gameRoutes = require('./routes/games')(app);

app.use('/',routes);
app.use('/games',gameRoutes);


module.exports = app

