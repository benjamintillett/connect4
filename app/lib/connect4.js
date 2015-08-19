Cell = require('./Cell');

function Connect4(){
	this.initializeBoard = function(rows,columns){
		var board = [];
		for(var i = 0; i < rows; i++){
			var row = [];
			for(var j = 0; j < columns; j++){
				row.push(new Cell(" "));
			}
			board.push(row);
		}
		this.board = board;
	}	
	this.makeMove = function(column,player){
		if (column < 0 || column >= this.board.length) return false;
		if (this.columnIsFull(column,this.board)) return false;		
		this.placeChip(column,player)
		return this.board
	}



	this.placeChip = function(column,player){
		var emptyRow;
		this.board.forEach(function(row,index){
			if (row[column].content == ' ') emptyRow = index
		});
		this.board[emptyRow][column].content = player;
		return this.board;	
	}

	this.columnIsFull = function(column){
		var isFull = true
		this.board.forEach(function(row){
			if(row[column].content == ' '){
				isFull = false;
			}
		});
		return isFull;
	}

}

module.exports = Connect4;
