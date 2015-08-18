var connect4 = require('../app/lib/connect4');
var expect = require('chai').expect

describe('connect4',function(){
	describe('.initializeBoard',function(){
		it('builds a 3x2 board',function(){
			var board = connect4.initializeBoard(3,2);
			expect(board).to.eql([[' ',' '],[' ',' '],[' ',' ']])
		});		
	});

	describe('.makeMove',function(){
		var board;

		before(function(){
			board = connect4.initializeBoard(3,2);
		});

		it("doesnt make a move that is outside the board",function(){
			var newBoard = connect4.makeMove("x",4,board)
			expect(newBoard).to.eql(null);
		});

		it("doesn't allow a move in a full column",function(){
			var board = [[' ','x'],[' ','o'],[' ','x']]
			var newBoard = connect4.makeMove("x",1,board)
			expect(newBoard).to.eql(null);
		});

		it("a valid move returns a board with the correct cell marked",function(){
			var board = [[' ',' '],[' ','o'],[' ','x']];
			var newBoard = connect4.makeMove("x",0,board)
			expect(newBoard).to.eql([[' ',' '],[' ','o'],['x','x']]);
		});
	});

	describe('checkForVictory', function(){
		var board;

		before(function(){
			board = [
					 [' ',' ',' ',' ',' '],
					 [' ',' ',' ',' ','o'],
					 [' ',' ',' ',' ','o'],
					 [' ',' ',' ',' ','o'],
					 ['x','x','x',' ','o'],
					]
		});

		it('knows and empty board has not been won',function(){
			var player = "x";
			expect(connect4.checkForVictory(player,1,board)).to.eql(false);
		});

		it('can recongnize a vertical win', function(){
			var player = "o";
			expect(connect4.checkForVictory(player,4,board)).to.eql(true);
		});

		it('can recognize a horizontal win',function(){
			board = [
					 [' ',' ',' ',' ',' '],
					 [' ',' ',' ',' ',' '],
					 [' ',' ',' ',' ',' '],
					 [' ',' ',' ',' ',' '],
					 ['x','x','x','x',' '],
					]
			var player = "o";
			expect(connect4.checkForVictory(player,3,board)).to.eql(true);
		});
	});
});
