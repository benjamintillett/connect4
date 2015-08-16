var testApp = angular.module('testApp',[]);

testApp.controller('SearchController', function($scope, searchService){
	searchService.search($scope.query)
		.then(function(data){
			$scope.results = data;
		})
		.catch(function(){
			$scope.error = 'There has been an error';
		});
});

testApp.controller('SearchController2', function(searchService){
	var self = this;
	self.query = "hello";
	searchService.search(self.query)
		.then(function(data){
			self.results = data;
		})
		.catch(function(){
			self.error = 'There has been an error';
		});
});


testApp.factory('searchService',function($q,$http){
	var service = {};

	service.search = function search (query){
		var deffered = $q.defer();

		$http.get('http://localhost/v1?=q' + query)
			.success(function(data){
				deffered.resolve(data)
			})
			.error(function(){
				deffered.reject();
			});

		return deferred.promise;
	}
	return service;
});

describe('Testing $q directly',function(){
	var deffered;
	var $q;
	var $rootScope;

	beforeEach(inject(function(_$q_,_$rootScope_){
		$q = _$q_;
		$rootScope = _$rootScope_;
		deferred = _$q_.defer();
	}));

	it('should resolve a promise',function(){
		var response;

		deferred.promise.then(function(data){
			response = data;
		});

		deferred.resolve('Returned OK!');

		$rootScope.$apply();

		expect(response).toEqual('Returned OK!');
	})

	it('should reject a promise',function(){
		var response;

		deferred.promise.catch(function(data){
			response = data;
		});

		deferred.reject('There has been and error');

		$rootScope.$apply();

		expect(response).toBe('There has been and error');
	});
});


describe('Testing a Controller that uses a promise',function(){

	var $scope;
	var $q;
	var deferred;
	var searchService

	beforeEach(module('testApp'));

	beforeEach(inject(function($controller,_$rootScope_,_$q_,_searchService_){
		$q = _$q_;
		$scope = _$rootScope_.$new();
		$scope.query = "hello";
		searchService = _searchService_


		deferred = _$q_.defer();

		spyOn(searchService,'search').and.returnValue(deferred.promise);

		$controller('SearchController',{
			$scope: $scope,
			searchService: searchService
		});
	}));

	it("send correct query to the searchService",function(){
		deferred.resolve();
		$scope.$apply();
		expect(searchService.search).toHaveBeenCalledWith('hello');
	});

	it("stores the returned id's in the results variable",function(){
		deferred.resolve([{id: 1},{ id: 2}]);
		$scope.$apply();
		expect($scope.results).toEqual([{id: 1},{ id: 2}]);
	});

	it("when the promise assign the error to $scope.error",function(){
		deferred.reject();
		$scope.$apply();
		expect($scope.error).toBe('There has been an error');
	});
});


describe('Testing a ControllerAs that uses a promise',function(){

	var $rootScope;
	var $q;
	var deferred;
	var searchService
	var controller

	beforeEach(module('testApp'));

	beforeEach(inject(function($controller,_$rootScope_,_$q_,_searchService_){
		$q = _$q_;
		$rootScope = _$rootScope_


		deferred = _$q_.defer();

		searchService = _searchService_
		
		spyOn(searchService,'search').and.returnValue(deferred.promise);

		controller = $controller('SearchController2',{
			searchService: searchService,
		});
	}));

	it("send correct query to the searchService",function(){
		
		deferred.resolve();
		$rootScope.$apply();
		expect(searchService.search).toHaveBeenCalledWith('hello');
	});

	// it("stores the returned id's in the results variable",function(){
	// 	deferred.resolve([{id: 1},{ id: 2}]);
	// 	$scope.$apply();
	// 	expect($scope.results).toEqual([{id: 1},{ id: 2}]);
	// });

	// it("when the promise assign the error to $scope.error",function(){
	// 	deferred.reject();
	// 	$scope.$apply();
	// 	expect($scope.error).toBe('There has been an error');
	// });
});



