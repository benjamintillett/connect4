var express 	= require('express');
var router 		= express.Router();
var Utils 		= require('../lib/utils');
var Game  		= require('../models/game');
var GameQueue  	= require('../models/gameQueue');
var Connect4 	= require('../lib/Connect4'); 
var redis = require('redis');
var client = redis.createClient();
var connect4 = new Connect4();


function _sanitizeReturn(game){
	return {
		boardId: game.boardId,
	    board: game.board,
	    rows: game.rows,
	    columns: game.columns,
	    turn: game.turn,
	    status: game.status,
	    winner: game.winner,
	    p1Name: game.p1Name,
	    p2Name: game.p2Name
	}
}

function _return400Error(res,message){
	return res.status(400).json({
		error: message
	});
};


function games(app) {
	
	var Validate 	= require('../lib/validators')(app);

	router.post('/create',[Validate.columns, Validate.rows, Validate.name],function(req,res,next){
		if(!req.body.name){
			res.status(400).json({
				"Error": "Must provide name field!"
			});
		}
		var rows = req.body.rows || app.get('config').MIN_ROWS
		var columns = req.body.columns || app.get('config').MIN_COLUMNS

		var newGame = {
			p1Key: Utils.randomValueHex(25),
			p2Key: Utils.randomValueHex(25),
			boardId: Utils.randomValueHex(6),
			p1Name: req.body.name,
			rows: rows,
			columns: columns,
			board: connect4.initializeBoard(rows,columns),
			turn: 1,
			status: 'Game in progress'
		};

		Game.create(newGame,function(err,game){
			GameQueue.create({boardId: game.boardId});
			if(err){
				return res.status(400).json(err);
			}
			game.p2key = undefined;
			res.status(201).json(game);
		});
	});

	router.get('/board/:id',function(req,res){
		Game.findOne({boardId: req.params.id},function(err, game){

			if(err) return res.status(400).json(err);

			res.status(200).json(_sanitizeReturn(game));
		});
	});

	router.post('/join',[Validate.name],function(req,res){
		GameQueue.findOne({},function(err,game){
			if(err) res.status(418).json(err)
			
			
			if(!game || !game.boardId){
				return res.status(418).json({
					error: "No games to join"
				});
			}
			var boardId = game.boardId;
			Game.findOne({ boardId: boardId },function(err,game){
				console.log("three");
				if(err) return res.status(400).json(err);

				game.p2Name = req.body.name;
				game.save(function(err,game){
					if(err) return res.status(500).json(err);
					game.p1Key = undefined;
					res.status(200).json(game);
				});
			});
		});
	});

	router.put('/board/:id',[Validate.token, Validate.move],function(req,res){
		Game.findOne({boardId: req.params.id},function(err,game){
			if(!game){
				return res.status(400).json({error: 'Cannot find board!'});
			}
			if(req.headers['X-Player-Token'] !== game.p1Key && req.headers['X-Player-Token'] !== game.p2Key) {
	        	return _return400Error(res, 'Wrong X-Player-Token!');
	     	}
	     	
	      	res.status(200);
		});


	});



	return router
}

module.exports = games;