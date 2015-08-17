var should 	= require('should');
var request = require('supertest');
var app 	= require('../server');
var User 	= require('mongoose').model('User');

describe('Users',function(){
	before(function(done){
		User.remove({},done);
	});

	describe('registration',function(){
		it('should register valid user',function(done){
			console.log(request(app).post('/register'))
				// .post('/register')
				// .send({
				// 	email: "test@test.com",
				// 	password: "hello"
				// })
				// .expect(303)

		});
	});
});
