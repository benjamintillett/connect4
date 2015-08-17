
var app = angular.module('connect4',['ui.router','ngMaterial','ngMdIcons']);





function Routes($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('users',{
			url: '/users',
			templateUrl: 'templates/users.html',
			controller: 'UsersCtrl as users',
			onEnter: ['$state','auth',function($state,auth){
				if(auth.isLoggedIn()){
					$state.go('home');
				}
			}]
		})
		.state('home',{
			url: '/home',
			templateUrl: 'templates/home.html',
			controller: 'HomeCtrl as home',
			onEnter: ['$state','auth',function($state,auth){
				if(!auth.isLoggedIn()){
					$state.go('users');
				}
			}]	
		})
	$urlRouterProvider.otherwise('/home');
}


angular.module('connect4').config(['$stateProvider','$urlRouterProvider',Routes]);



