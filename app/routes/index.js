var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');


var User = mongoose.model('User');
var jwt = require('express-jwt');

var auth = jwt({ secret: 'Secret', userProperty: 'payload'});

function users(app){

	var Validate 	= require('../lib/validators')(app);

	router.get('/',function(req,res,next){
		res.render('index');
	});


	router.post('/register',[Validate.userFields],function(req,res,next){
	
		var user = new User();

		user.username = req.body.username;

		user.setPassword(req.body.password)
		
		user.save(function(err){
			if(err) { return next(err); }
			return res.status(201).json({token: user.generateJWT()});
		})
	});

	router.post('/login', function(req, res, next){
	  if(!req.body.username || !req.body.password){
	    return res.status(400).json({message: 'Please fill out all fields'});
	  }

	  passport.authenticate('local', function(err, user, info){
	    if(err){ return next(err); }

	    if(user){
	      return res.status(200).json({token: user.generateJWT()});
	    } else {
	      return res.status(401).json(info);
	    }
	  })(req, res, next);
	});

	return router

}







module.exports = users;