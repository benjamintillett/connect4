function Cell(content){
	this.content = content

	this.containsChip = function(player){
		return this.content === player;
	}
}



module.exports = Cell