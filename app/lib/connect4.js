

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
		if (!this.isInBoard(column)) return false;
		if (this.columnIsFull(column,this.board)) return false;		
		this.placeChip(column,player)
		return this.board
	}

	this.isInBoard = function(column,row){
		var row = row || 0;
		var column = column;
		return ( 0 <= column && column < this.columns && 0 <= row && row < this.rows)
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

	this.checkForVictory = function(player,column){
		var row = this.getRowIndexOfLastChip(player,column)
		if(this.hasVerticalConnect4(player,column)) return true
		if(this.hasHorizontalConnect4(player,row)) return true
		if(this.hasDiagonallyUpConnect4(player,row,column)) return true
		if(this.hasDiagonallyDownConnect4(player,row,column)) return true
		return false
	}

	this.getRowIndexOfLastChip = function(player,column){
		var lastRow;
		this.board.forEach(function(row,index){
			if (row[column] == player && lastRow == undefined) lastRow = index
		});
		return lastRow;
	}

	this.getColumnArray = function(column){
		var columnArray = [];
		this.board.forEach(function(row){
			columnArray.push(row[column]);
		});
		return columnArray;
	}	

	this.getDiagonallyUpArray = function(column,row){
		var board = this.board;
		var currentRow = row;
		var currentColumn = column;
		while(this.isInBoard(currentColumn - 1,currentRow + 1)){
			currentColumn--
			currentRow++
		}
		var diagonalArray = [];
		while(this.isInBoard(currentColumn,currentRow)){
			diagonalArray.push(board[currentRow][currentColumn]);
			currentColumn++
			currentRow--
		}
		return diagonalArray;
	}
	this.getDiagonallyDownArray = function(column,row){
		var board = this.board;
		var currentRow = row;
		var currentColumn = column;
		while(this.isInBoard(currentColumn - 1,currentRow - 1)){
			currentColumn--
			currentRow--
		}
		var diagonalArray = [];
		while(this.isInBoard(currentColumn,currentRow)){
			diagonalArray.push(board[currentRow][currentColumn]);
			currentColumn++
			currentRow++
		}
		return diagonalArray;
	}

	this.checkForLineOf4 = function(array,player){
		var lineOf4 = false;
		var count 	= 0;
		array.forEach(function(elt){
			if (elt == player){
				count++
				if (count >= 4) lineOf4 = true;
			}else{
				count = 0;
			}
		});
		return lineOf4;
	}

	this.hasVerticalConnect4 = function(player,column){
		var columnArray = this.getColumnArray(column);
		return this.checkForLineOf4(columnArray,player);
	} 

	this.hasHorizontalConnect4 = function(player,rowIndex){
		var row = this.board[rowIndex];
		return this.checkForLineOf4(row,player);	
	}
	this.hasDiagonallyUpConnect4 = function(player,row,column){
		var diagonalArray = this.getDiagonallyUpArray(column,row);
		return this.checkForLineOf4(diagonalArray,player);		
	}
	this.hasDiagonallyDownConnect4 = function(player,row,column){
		var diagonalArray = this.getDiagonallyDownArray(column,row);
		return this.checkForLineOf4(diagonalArray,player);		
	}

}

module.exports = Connect4;




