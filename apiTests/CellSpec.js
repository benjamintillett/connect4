var Cell = require('../app/lib/Cell');
var expect = require('chai').expect

describe('Cell',function(){
	
	describe('.initialization',function(){
		it('sets the content attribute on initialzation',function(){
			var cell = new Cell(' ')
			expect(cell.content).to.eql(' ')
		});		
	});

	describe('.containsPlayerChip',function(){
		it('knows if it contains a given players Chip',function(){
			var cell = new Cell('x')
			var player = 'x';
			expect(cell.containsChip(player)).to.equal(true);
		});
		it("knows if it doesn't contain a given players Chip",function(){
			var cell = new Cell('x')
			var player = 'o';
			expect(cell.containsChip(player)).to.equal(false);
		});
	});

});
