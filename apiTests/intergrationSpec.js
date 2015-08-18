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
		request(app).put('/games/board/' + boardId)
			.send({column: 1})
			.end(function(err,res){
				expect(res.body.error).to.equal('Missing X-Player-Token!');
				done();
			});
	});

	it('cannot move with wrong X-player-token',function(done){
		request(app).put('/games/board/' + boardId)
			.set('X-Player-Token', 'wrong token!')
			.send({column: 1})
			.expect(400)
			.end(function(err,res){
				expect(res.body.error).to.equal('Wrong X-Player-Token!');
				done();
			});
	});

	it('cannot move on an unkown board',function(done){
		request(app).put('/games/board/3123')
			.set('X-Player-Token',p1Key).
			send({column: 1})
			.expect(404)
			.end(function(err,res){
				expect(res.body.error).to.equal('Cannot find board!');
				done();
			});
	});

	it('cannot move without a column',function(done){
		request(app).put('/board/' + boardId)
			.set('X-Player-Token',p1Key).
			expect(404)
			.end(function(err,res){
				done();
				expect(res.body.error).to.equal('Move where? Missing column!');
			});
	});

	it('cannot move outside the board',function(done){
		request(app).put('/board/' + boardId)
			.set('X-Player-Token',p1Key)
			.send({column: 18})
			.expect(200)
			.end(function(err,res){
				done();
				expect(res.body.error).to.equal('Bad Move!');
			});
	});
	
});
