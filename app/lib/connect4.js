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

connect4.makeMove = function(player,column, board){
	if (column < 0 || column >= board.length) return null;
	if (this.columnIsFull(column,board)) return null;

	newBoard = this.placeChip(column,board,player);
	return newBoard;
}

connect4.placeChip = function(column,board,player){
	var emptyRow;
	board.forEach(function(row,index){
		if (row[column] == ' ') emptyRow = index
	});
	board[emptyRow][column] = player;
	return board;	
}

connect4.columnIsFull = function(column,board){
	var isFull = true
	board.forEach(function(row){
		if(row[column] == ' '){
			isFull = false;
		}
	});
	return isFull;
}

connect4.checkForVictory = function(player,column,board){
	var row = this.getLastRow(player,column,board)
	if(this.checkVertical(player,column,row,board)){
		return true
	}
	return false
}
connect4.getLastRow = function(player,column,board){
	var lastRow;
	board.forEach(function(row,index){
		if (row[column] == player && lastRow == undefined) lastRow = index
	});
	return lastRow;
}

connect4.checkVertical = function(player,column,row,board){
	var line = 0;
	var value = player;
	while(value == player && row < board.length){
		value == board[row][column];
		line++
		row++
	}
	return line >= 4;
}



module.exports = connect4;
