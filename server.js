var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/connect4');

var passport = require('passport');
require('./models/User');
var routes = require('./routes/index');
require('./config/passport');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(passport.initialize());
app.use('/',routes);



app.listen('3000');

console.log('Express started on port 3000');
