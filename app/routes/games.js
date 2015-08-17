var express 	= require('express');
var router 		= express.Router();
var Utils 		= require('../lib/utils');
var Game  		= require('../models/game');
var connect4 	= require('../lib/connect4'); 

function games(app) {

	router.post('/create',function(req,res,next){
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
	return router
}

module.exports = games;