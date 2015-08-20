var Connect4 = require('../app/lib/Connect4');
var expect = require('chai').expect
var expect = require('chai').expect

describe('connect4',function(){
	
	var connect4 = new Connect4()

	describe('.initializeBoard',function(){
		it('builds a 3x2 board of cells',function(){
			board = connect4.initializeBoard(3,2);
			expect(board.length).to.eql(3)
			expect(board[0].length).to.eql(2)
			expect(board[0][0]).to.eql(' ')
		});		
	});

	describe('.makeMove',function(){
		var connect4 = new Connect4();
		var board;
		before(function(){
			board = connect4.initializeBoard(3,2);
		});

		it("doesnt make a move that is outside the board",function(){
			expect(connect4.makeMove(4,"x",board)).to.eql(false);
		});

		it("doesn't allow a move in a full column",function(){
			board = [
						 [' ','x'],
						 ['x','o'],
						 ['x','x']
						]
			expect(connect4.makeMove(1,"x",board)).to.eql(false);
		});

		it("a valid move adds the player chip to the correct cell cell marked",function(){
			board = [
						 [' ',' '],
						 ['x','o'],
						 ['x','x']
						]
			board = connect4.makeMove(1,"x",board)
			expect(board[0][1]).to.eql('x');
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

		it('knows x has not won',function(){
			expect(connect4.checkForVictory('x',1,board)).to.eql(false);
		});

		it('can recognize a vertical win', function(){
			board = [
					 [' ',' ',' ',' ',' '],
					 [' ',' ',' ',' ','o'],
					 [' ',' ',' ',' ','o'],
					 [' ',' ',' ',' ','o'],
					 ['x','x','x',' ','o'],
			]
			expect(connect4.checkForVictory('x',0,board)).to.eql(false);
			expect(connect4.checkForVictory('o',4,board)).to.eql(true);
		});

		it('can recognize a horizontal win',function(){
			board = [
					 [' ',' ',' ',' ',' '],
					 [' ',' ',' ',' ',' '],
					 [' ',' ',' ',' ',' '],
					 [' ',' ',' ',' ',' '],
					 ['x','x','x','x',' '],
					]

			expect(connect4.checkForVictory('x',1,board)).to.eql(true);
		});
		it('can recognize a upwards digonal win',function(){
			board = [
					 [' ',' ',' ',' ',' '],
					 [' ',' ',' ','o',' '],
					 [' ',' ','o','x',' '],
					 ['x','o','o','o',' '],
					 ['o','x','x','x',' '],
					]
			expect(connect4.checkForVictory('o',1,board)).to.eql(true);
		});
		it('can recognize a upwards digonal win',function(){
			board = [
					 [' ','x',' ',' ',' '],
					 [' ','o','x','o',' '],
					 [' ','o','o','x',' '],
					 ['x','o','o','o','x'],
					 ['o','x','x','x','o'],
					]
			expect(connect4.checkForVictory('x',0,board)).to.eql(false);
			expect(connect4.checkForVictory('o',1,board)).to.eql(true);
		});
	});

});