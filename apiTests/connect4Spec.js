var Connect4 = require('../app/lib/Connect4');
var expect = require('chai').expect
var expect = require('chai').expect

describe('connect4',function(){
	
	var connect4 = new Connect4()

	describe('.initializeBoard',function(){
		it('builds a 3x2 board of cells',function(){
			connect4.initializeBoard(3,2);
			expect(connect4.board.length).to.eql(3)
			expect(connect4.board[0].length).to.eql(2)
			expect(connect4.board[0][0]).to.eql(' ')
		});		
	});

	describe('.makeMove',function(){
		var connect4 = new Connect4();

		before(function(){
			connect4.initializeBoard(3,2);
		});

		it("doesnt make a move that is outside the board",function(){
			expect(connect4.makeMove(4,"x")).to.eql(false);
		});

		it("doesn't allow a move in a full column",function(){
			connect4.board = [
						 [' ','x'],
						 ['x','o'],
						 ['x','x']
						]
			expect(connect4.makeMove(1,"x")).to.eql(false);
		});

		it("a valid move adds the player chip to the correct cell cell marked",function(){
			connect4.board = [
						 [' ',' '],
						 ['x','o'],
						 ['x','x']
						]
			connect4.makeMove(1,"x")
			expect(connect4.board[0][1]).to.eql('x');
		});
	});

	describe('checkForVictory', function(){
		var board;

		before(function(){
			connect4.rows = 5;
			connect4.columns = 5;
			connect4.board = [
					 [' ',' ',' ',' ',' '],
					 [' ',' ',' ',' ','o'],
					 [' ',' ',' ',' ','o'],
					 [' ',' ',' ',' ','o'],
					 ['x','x','x',' ','o'],
					]
		});

		it('knows x has not won',function(){
			expect(connect4.checkForVictory('x')).to.eql(false);
		});

		it('can recognize a vertical win', function(){
			connect4.board = [
					 [' ',' ',' ',' ',' '],
					 [' ',' ',' ',' ','o'],
					 [' ',' ',' ',' ','o'],
					 [' ',' ',' ',' ','o'],
					 ['x','x','x',' ','o'],
			]
			connect4.rows = 5;
			connect4.columns = 5;
			expect(connect4.checkForVictory('o')).to.eql(true);
		});

		// it('can recognize a horizontal win',function(){
		// 	connect4.board = [
		// 			 [' ',' ',' ',' ',' '],
		// 			 [' ',' ',' ',' ',' '],
		// 			 [' ',' ',' ',' ',' '],
		// 			 [' ',' ',' ',' ',' '],
		// 			 ['x','x','x','x',' '],
		// 			]
		// 	connect4.rows = 5;
		// 	connect4.columns = 5;
		// 	expect(connect4.checkForVictory('x')).to.eql(true);
		// });
		// it('can recognize a upwards digonal win',function(){
		// 	board = [
		// 			 [' ',' ',' ',' ',' '],
		// 			 [' ',' ',' ','o',' '],
		// 			 [' ',' ','o','x',' '],
		// 			 ['x','o','o','o',' '],
		// 			 ['o','x','x','x',' '],
		// 			]
		// 	var player = "x";
		// 	expect(connect4.checkForVictory(player,3,board)).to.eql(true);
		// });
	});

});