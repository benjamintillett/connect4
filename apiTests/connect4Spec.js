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
			expect(connect4.board[0][0].constructor).to.eql(Cell)
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
						 [new Cell(' '),new Cell('x')],
						 [new Cell('x'),new Cell('o')],
						 [new Cell('x'),new Cell('x')]
						]
			expect(connect4.makeMove(1,"x")).to.eql(false);
		});

		it("a valid move adds the player chip to the correct cell cell marked",function(){
			connect4.board = [
						 [new Cell(' '),new Cell(' ')],
						 [new Cell('x'),new Cell('o')],
						 [new Cell('x'),new Cell('x')]
						]
			connect4.makeMove(1,"x")
			expect(connect4.board[0][1].content).to.eql('x');
		});
	});

});