var should 	= require('should');
var request = require('supertest');
var app 	= require('../app/server');
var User 	= require('mongoose').model('User');
var chai 	= require('chai')
var expect 	= chai.expect;

describe('Users',function(){
	before(function(done){
		User.remove({},done);
	});

	describe('registration',function(){
		it('should register valid user',function(done){
			request(app)
				.post('/register')
				.send({
					username: "test@test.com",
					password: "hello"
				})
				.expect(201)
				.end(function(err,res){
					done(err);
				});
		});
		it('should reject a invalid user and return an error',function(done){
			request(app)
				.post('/register')
				.send({
					username: "test@test.com"
				})
				.expect(400)
				.end(function(err,res){
					expect(res.body.message).to.equal("Please fill out all fields");
					done(err);
				});
		});
	});

	describe('login',function(){
		it('should login a valid user and return a token',function(done){
			request(app)
				.post('/login')
				.send({
					username: "test@test.com",
					password: "hello"
				})
				.expect(200)
				.end(function(err,res){
					expect(res.body.token).to.exist
					done(err);
				});
		});
		it('should reject a invalid user and return an error',function(done){
			request(app)
				.post('/login')
				.send({
					username: "test@test.com",
					password: "wrong"
				})
				.expect(401)
				.end(function(err,res){
					expect(res.body.message).to.equal("Incorrect password.");
					done(err);
				});
		});
	});
});
