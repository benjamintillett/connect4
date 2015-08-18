module.exports = function(app){

	var MIN_COLUMNS = app.get('config').MIN_COLUMNS;
	var MIN_ROWS = app.get('config').MIN_ROWS;

	var _return400Error = function(res,message){
		return res.status(400).json({
			error: message
		});
	};

	return {


		columns: function(req,res,next){
			if(req.body.columns && req.body.columns < MIN_COLUMNS){
				return _return400Error(res, "Number of columns has to be >= " + MIN_COLUMNS);
			}
			next();
		},
		rows: function(req,res,next){
			if(req.body.rows && req.body.rows < MIN_ROWS){
				return _return400Error(res,"Number of rows has to be >= " + MIN_ROWS)
			}
			next();
		},
		name: function(req,res,next){
			if(!req.body.name){
				return _return400Error(res,"Must provide name field!");
			}
			next();
		},
		userFields: function(req,res,next){
			if(!req.body.username || !req.body.password){
				return _return400Error(res,'Please fill out all fields');
			}	
			next();
		},
		token: function(req,res,next){
			if(!req.headers['x-player-token']){
				return _return400Error(res,'Missing X-Player-Token!');
			}	
			next();
		},
		move: function(req,res,next){
			if(!req.body.column){
				return _return400Error(res,'Move where? Missing column!');
			}
			next();
		}


	}
}