function auth($http,$window){
	var auth = {};

	auth.saveToken = function(token){
		$window.localStorage['connect4-token'] = token
	}

	auth.getToken = function(){
		return $window.localStorage['connect4-token']
	}

	auth.isLoggedIn = function(){
		var token = auth.getToken();
		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	}

	auth.currentUser = function(){
		if(auth.isLoggedIn()){
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.username;
		}
	}

	auth.register = function(user){
		console.log(user);
		return $http.post('/register', user).success(function(data){
			auth.saveToken(data.token);
		});
	};

	auth.logIn = function(user){
	  return $http.post('/login', user).success(function(data){
	    auth.saveToken(data.token);
	  });
	};

	auth.logOut = function(){
		console.log('hello');
	  $window.localStorage.removeItem('connect4-token');
	};

	return auth;
}

angular.module('connect4').factory('auth',['$http','$window',auth]);
