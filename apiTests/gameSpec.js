var expect = require('chai').expect
var request = require('supertest');

var app = require('../app/server');


const MIN_COLUMNS = app.get('config').MIN_COLUMNS;
const MIN_ROWS = app.get('config').MIN_ROWS;

describe('Create a new game object with a key for player 1',function(){

	var boardId;

	it('should return a game object  with a key for player 1',function(done){
		request(app).post('/games/create')
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
				
				expect(responseBody.board).to.be.an('array');
				responseBody.board.forEach(function(elt){
					expect(elt).to.be.an('array');
				});

				boardId = responseBody.boardId;
				done();
			});
	});

	it('should allow you to customize the size of the board',function(done){
		request(app).post('/games/create')
			.send({
				name: 'express',
				columns: 8,
				rows: 16
			})
			.expect(200)
			.end(function(err,res){
				var b = res.body;
				expect(b.columns).to.equal(8)
				expect(b.rows).to.equal(16)
				expect(b.board).to.have.length(16);
				expect(b.board[0]).to.have.length(8);
				done();
			});
	});	

	it('should not accept sizes < ' + MIN_COLUMNS + ' for columns', function(done){
		request(app).post('/games/create')
			.send({
				name: 'express',
				columns: 5,
				rows: 16
			})
			.expect(400)
			.end(function(err,res){
				expect(res.body.error).to.equal('Number of columns has to be >= ' + MIN_COLUMNS);
				done();
		});
	});

	it('should not accept sizes < ' + MIN_ROWS + ' for rows', function(done){
		request(app).post('/games/create')
			.send({
				name: 'express',
				columns: 8,
				rows: -16
			})
			.expect(400)
			.end(function(err,res){
				expect(res.body.error).to.equal('Number of rows has to be >= ' + MIN_ROWS);
				done();
		});
	});	

});


















