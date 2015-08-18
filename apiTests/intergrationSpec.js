var expect = require('chai').expect,
	request = require('supertest'),
	GameQueue = require('../app/models/gameQueue')

var app = require('../app/server'),
	p1Key, p2Key, boardId;

describe('Make move | ',function(err,res){
	before(function(done){
		GameQueue.remove({}, function(err){
			if(err) return done(err);
			done();
		});
	});

	it('create a game',function(done){
		request(app).post('/games/create')
			.send({name: "express"})
			.end(function(err,res){
				expect(res.statusCode).to.equal(201);
				p1Key = res.body.p1Key;
				boardId = res.body.boardId;
				done();
			});
	});

	it('join a game',function(done){
		request(app).post('/games/join')
			.send({name: 'koa'})
			.end(function(err,res){
				expect(res.statusCode).to.equal(200);
				p2Key = res.body.p2Key;
				done();
			});
	});

	it('cannot move with out a player token',function(done){
		request(app).put('/game/board/' + boardId)
			.send({column: 1})
			.end(function(err,res){
				expect(res.body.error).to.equal('Missing player token');
				done();
			});
	});
	



});
