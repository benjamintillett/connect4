
describe('UserCtrl',function(){

	var ctrl, auth, deferred, $rootScope, $q, $httpBackend, $state 

	beforeEach(module('connect4'));



	beforeEach(inject(function($controller,_auth_,_$rootScope_,_$q_,_$httpBackend_,_$state_){
		$rootScope 		= _$rootScope_
		$httpBackend 	= _$httpBackend_
		$state 			= _$state_
		auth 			= _auth_
		deferred = _$q_.defer();

		spyOn(auth,'register').and.returnValue(deferred.promise);
		spyOn(auth,'logIn').and.returnValue(deferred.promise);

		$httpBackend.expectGET('templates/home.html').respond(200);

		

	}));

	describe('.register success', function(){

		var formData = { username: 'ben', password: 'lol' }

		beforeEach(inject(function($controller){
			spyOn(auth,'isLoggedIn').and.returnValue(true);
			ctrl 	= $controller('UsersCtrl',{ auth: auth });
			ctrl.formData = formData;
			ctrl.register();
			deferred.resolve();
		}));

		it('sends the correct data the the auth services register function',function(){

			$rootScope.$apply();
			expect(auth.register).toHaveBeenCalledWith(formData);
		});

		it('on success redirects to the home state',function(){
			$rootScope.$apply();	
			$httpBackend.flush();
			expect($state.current.name).toEqual('home');
		});

	});

	describe('.register failure', function(){

		beforeEach(inject(function($controller){
			spyOn(auth,'isLoggedIn').and.returnValue(false);
			ctrl 	= $controller('UsersCtrl',{ auth: auth });
			ctrl.register();
			deferred.reject("There has been an error");
		}));

		it('correctly assing the error',function(){
			$rootScope.$apply();
			expect(ctrl.error).toEqual("There has been an error");
		});

	});

	describe('.login success', function(){

		var formData = { username: 'ben', password: 'lol' }

		beforeEach(inject(function($controller){
			spyOn(auth,'isLoggedIn').and.returnValue(true);
			ctrl 	= $controller('UsersCtrl',{ auth: auth });
			ctrl.formData = formData;
			ctrl.logIn();
			deferred.resolve();
		}));

		it('sends the correct data the the auth services register function',function(){
			$rootScope.$apply();
			expect(auth.logIn).toHaveBeenCalledWith(formData);
		});

		it('on success redirects to the home state',function(){
			$rootScope.$apply();	
			$httpBackend.flush();
			expect($state.current.name).toEqual('home');
		});

	});	

	describe('.login failure', function(){

		var formData = { username: 'ben', password: 'wrong' }

		beforeEach(inject(function($controller){
			spyOn(auth,'isLoggedIn').and.returnValue(false);
			ctrl 	= $controller('UsersCtrl',{ auth: auth });
			ctrl.formData = formData;
			ctrl.logIn();
			deferred.reject("wrong password");
		}));

		it('correct assigns the error',function(){
			$rootScope.$apply();	
			expect(ctrl.error).toEqual('wrong password');
		});

	});	

});



