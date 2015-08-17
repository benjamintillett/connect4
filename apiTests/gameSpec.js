var expect = require('chai').expect
var request = require('supertest');

var app = require('../app/server');

describe('Create a new game object with a key for player 1',function(){

	var boardId;

	it('should return a game object  with a key for player 1',function(done){
		request(app).post('/create')
			.send({name: 'express'})
			.expect(200)
			.end(function(err,res){
				var responseBody = res.body;
				expect(responseBody.boardId).to.be.a('string');
				expect(responseBody.p1Key).to.be.a('string');
				expect(responseBody.p1Name).to.be.a('string').and.equal('express');
				
				expect(responseBody.turn).to.be.a('number').and.equal(1);
				expect(responseBody.rows).to.be.a('number');
				expect(responseBody.columns).to.be.a('number');
				
				expect(responseBody.board).to.be.an('array').and.equal(1);
				b.board.forEach(function(elt){
					expect(elt).to.be.an('array');
				});

				boardId = b.boardId;
				done();
			});
	});

});