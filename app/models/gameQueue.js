var mongoose = require('mongoose');

var gameQueueSchema = new mongoose.Schema({
	boardId: {
		type: String,
		required: true,
		unique: true
	}
});

module.exports = mongoose.model('GameQueue', gameQueueSchema);