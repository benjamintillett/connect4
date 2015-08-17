var connect4 = {};

connect4.initializeBoard = function(rows,columns){
	var board = [];
	for(var i = 0; i < rows; i++){
		var row = [];
		for(var j = 0; j < columns; j++){
			row.push(" ");
		}
		board.push(row);
	}
	return board
}	


module.exports = connect4;
