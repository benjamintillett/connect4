

function Connect4(){
	this.initializeBoard = function(rows,columns){
		var board = [];
		for(var i = 0; i < rows; i++){
			var row = [];
			for(var j = 0; j < columns; j++){
				row.push(" ");
			}
			board.push(row);
		}
		this.rows 	= rows;
		this.columns = columns; 
		this.board 	= board;
	}	
	this.makeMove = function(column,player){
		if (!this.isInBoard({ column: column})) return false;
		if (this.columnIsFull(column,this.board)) return false;		
		this.placeChip(column,player)
		return this.board
	}

	this.isInBoard = function(coordinates){
		var row = coordinates.row || 0;
		var column = coordinates.column;
		return (this.board[0][column] != undefined && this.board[row] != undefined && this.board[row][column] != undefined)
	}

	this.placeChip = function(column,player){
		var emptyRow;
		this.board.forEach(function(row,index){
			if (row[column] == ' ') emptyRow = index
		});
		this.board[emptyRow][column] = player;
		return this.board;	
	}

	this.columnIsFull = function(column){
		var isFull = true
		this.board.forEach(function(row){
			if(row[column]== ' '){
				isFull = false;
			}
		});
		return isFull;
	}

	this.checkForVictory = function(player){
		if(this.hasVerticalConnect4(player)) return true
		if(this.hasHorizontalConnect4(player)) return true
		return false
	}

	this.hasVerticalConnect4 = function(player){
		var columns = this.columns;
		var rows 	= this.rows;
		var board 	= this.board;
		for(var column = 0; column < columns; column++){
			var count = 0
			var cellValue;
			for(var row = 0; row < rows; row++){
				cellValue 		= broad[column];
				if (cellValue == player){
					count++
					if(count >= 4) {
						lineOf4 = true;
					}
				} else {
					count = 0;
				}
				
			});	
		}
		return lineOf4;
	} 

	this.hasVerticalConnect4 = function(player){
		var lineOf4 = false
		for(var column = 0; column < this.columns; column++){
			var count = 0
			var cellValue;
			this.board.forEach(function(row){
				cellValue 		= row[column];
				if (cellValue == player){
					count++
					if(count >= 4) {
						lineOf4 = true;
					}
				} else {
					count = 0;
				}
				
			});	
		}
		return false;
	} 

	this.hasHorizontalConnect4 = function(player){
		var columns = this.columns;
		var lineOf4 = false
		this.board.forEach(function(row){
			var cellValue;
			var count = 0
			for(var column = 0; column < columns; column++){
				cellValue 		= row[column];
				if (cellValue == player){
					count++
					if(count >= 4) {
						lineOf4 = true;
					}
				} else {
					count = 0;
				}
			}
		});
		return lineOf4;
	}
	this.hasDiagonallyUpConnect4 = function(player){
		var columns = this.columns;
		var lineOf4 = false
		this.board.forEach(function(row){
			var cellValue;
			var count = 0
			for(var column = 0; column < columns; column++){
				cellValue 		= row[column];
				if (cellValue == player){
					count++
					if(count >= 4) {
						lineOf4 = true;
					}
				} else {
					count = 0;
				}
			}
		});
		return lineOf4;
	}

}

module.exports = Connect4;




