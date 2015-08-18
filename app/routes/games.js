var express 	= require('express');
var router 		= express.Router();
var Utils 		= require('../lib/utils');
var Game  		= require('../models/game');
var connect4 	= require('../lib/connect4'); 

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

	return router
}

module.exports = games;