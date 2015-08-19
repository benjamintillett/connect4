var Connect4 = require('../app/lib/Connect4');
var expect = require('chai').expect


describe('connect4',function(){
	
	var connect4 = new Connect4()

	describe('.initializeBoard',function(){
		it('builds a 3x2 board',function(){
			var board = connect4.initializeBoard(3,2);
			expect(board).to.eql([[' ',' '],[' ',' '],[' ',' ']])
		});		
	});

});