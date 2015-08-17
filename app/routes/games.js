var Utils 	= require('../lib/utils');
var Game  	require('../models/game');

app.post('/create',function(req,res){
	if(!req.body.name){
		res.status(400).json({
			"Error": "Must provide name field!"
		});
	}

	var newGame = {
		p1Key: Utils.randomValueHex(25),
		p2Key: Utils.randomValueHex(25),
		boardId: Utils.randomValueHex(6),
		p1Name: req.body.name,
		board: [[].[]],
		rows: req.body.columns || app.get('config').MIN_COLUMNS,
		turn, 1
		status: 'Game in progress'
	});

	Game.create(newGame,function(err,game){
		if(err){
			return res.status(400).json(err);
		}
		game.p2key = undefined;
		res.status(201).json(game);
	});
});
