function UsersCtrl($state,auth){
	var self = this;


	var formData = {};

	self.register = function(){
		auth.register(self.formData).then(function(){
			$state.go('home');
		}).catch(function(error){
			self.error = error;
		})
	}
	self.logIn = function(){
		auth.logIn(self.formData).then(function(){
			$state.go('home');
		}).catch(function(error){
			self.error = error;
		})
	}
}	



function HomeCtrl(){
	var self = this;
	
	self.message = "Hello you are home";
}


function NavCtrl($state,auth){

	var self = this;

	self.isLoggedIn = auth.isLoggedIn;
	self.currentUser = auth.currentUser;	
	
	self.logOut = function(){
		auth.logOut();
		$state.go('users');
	}
}

function MainCtrl($state,auth){
	var self = this;

	self.isLoggedIn = auth.isLoggedIn;
	self.currentUser = auth.currentUser;
	
	self.logOut = function(){
		auth.logOut();
		$state.go('users');
	}
}





angular.module('connect4')
	.controller('HomeCtrl',HomeCtrl)
	.controller('UsersCtrl',['$state','auth',UsersCtrl])
	.controller('MainCtrl',['$state','auth',MainCtrl])
	.controller('NavCtrl',['$state','auth',NavCtrl]);