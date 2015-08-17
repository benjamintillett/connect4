var connect4 = require('../app/lib/connect4');
var expect = require('chai').expect

describe('connect4',function(){
	describe('.initializeBoard',function(){
		it('builds a 3x2 board',function(){
			var board = connect4.initializeBoard(3,2);
			expect(board).to.eql([[' ',' '],[' ',' '],[' ',' ']])
		});		
	});
});
