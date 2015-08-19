var Cell = require('../app/lib/Cell');
var expect = require('chai').expect

describe('Cell',function(){
	
	describe('.initialization',function(){
		it('sets the content attribute on initialzation',function(){
			var cell = new Cell(' ')
			expect(cell.content).to.eql(' ')
		});		
	});

});
