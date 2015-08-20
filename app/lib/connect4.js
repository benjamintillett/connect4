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
		return board;
	}	
	this.makeMove = function(column,player,board){
		if (!this.isInBoard(column,0,board)) return false;
		if (this.columnIsFull(column,board)) return false;		
		return this.placeChip(column,player,board)
	}

	this.isInBoard = function(column,row,board){
		var rows 	= board.length;
		var columns = board[0].length;
		var row = row || 0;
		var column = column;
		return ( 0 <= column && column < columns && 0 <= row && row < rows)
	}

	this.placeChip = function(column,player,board){
		var emptyRow;
		board.forEach(function(row,index){
			if (row[column] == ' ') emptyRow = index
		});
		board[emptyRow][column] = player;
		return board;	
	}

	this.columnIsFull = function(column,board){
		var isFull = true
		board.forEach(function(row){
			if(row[column]== ' '){
				isFull = false;
			}
		});
		return isFull;
	}

	this.checkForVictory = function(player,column,board){
		var row = this.getRowIndexOfLastChip(player,column,board)
		if(this.hasVerticalConnect4(player,column,board)) return true
		if(this.hasHorizontalConnect4(player,row,board)) return true
		if(this.hasDiagonallyUpConnect4(player,row,column,board)) return true
		if(this.hasDiagonallyDownConnect4(player,row,column,board)) return true
		return false
	}

	this.getRowIndexOfLastChip = function(player,column,board){
		var lastRow;
		board.forEach(function(row,index){
			if (row[column] == player && lastRow == undefined) lastRow = index
		});
		return lastRow;
	}

	this.getColumnArray = function(column,board){
		var columnArray = [];
		board.forEach(function(row){
			columnArray.push(row[column]);
		});
		return columnArray;
	}	

	this.getDiagonallyUpArray = function(column,row,board){
		var currentRow = row;
		var currentColumn = column;
		while(this.isInBoard(currentColumn - 1,currentRow + 1,board)){
			currentColumn--
			currentRow++
		}
		var diagonalArray = [];
		while(this.isInBoard(currentColumn,currentRow,board)){
			diagonalArray.push(board[currentRow][currentColumn]);
			currentColumn++
			currentRow--
		}
		return diagonalArray;
	}
	this.getDiagonallyDownArray = function(column,row,board){
		var currentRow = row;
		var currentColumn = column;
		while(this.isInBoard(currentColumn - 1,currentRow - 1,board)){
			currentColumn--
			currentRow--
		}
		var diagonalArray = [];
		while(this.isInBoard(currentColumn,currentRow,board)){
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

	this.hasVerticalConnect4 = function(player,column,board){
		var columnArray = this.getColumnArray(column,board);
		return this.checkForLineOf4(columnArray,player);
	} 

	this.hasHorizontalConnect4 = function(player,rowIndex,board){
		var row = board[rowIndex];
		return this.checkForLineOf4(row,player);	
	}
	this.hasDiagonallyUpConnect4 = function(player,row,column,board){
		var diagonalArray = this.getDiagonallyUpArray(column,row,board);
		return this.checkForLineOf4(diagonalArray,player);		
	}
	this.hasDiagonallyDownConnect4 = function(player,row,column,board){
		var diagonalArray = this.getDiagonallyDownArray(column,row,board);
		return this.checkForLineOf4(diagonalArray,player);		
	}

}

module.exports = Connect4;




