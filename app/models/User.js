var mongoose = require('mongoose');
var validator = require('validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({

	username: {
		type: String,
		required: true,
		unique: true
	},

	hash: String,
	
	salt: String,
	
	created_at: {
		type: Date,
		default: Date.now
	}
});

userSchema.methods.setPassword = function(password){

	this.salt = crypto.randomBytes(16).toString('hex');

	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000,64).toString('hex');
};

userSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt,1000,64).toString('hex');

	return this.hash === hash;
};

userSchema.methods.generateJWT = function(){

	var today = new Date();

	var exp = new Date();

	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		_id: this.id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000),
	}, 'Secret');	
}




userSchema.pre('save',function(next){
	if(!this.isModified('password')){
		return next();
	}
	this.password = User.encryptPassword(this.password);
});

var User = mongoose.model('User',userSchema);


module.exports = User;