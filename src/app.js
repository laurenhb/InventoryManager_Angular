(function(){
    angular.module('routerApp', ['ui.router', 'ngStorage'])
    .config(function($stateProvider, $urlRouterProvider, $localStorageProvider){

        $urlRouterProvider.otherwise('/home');

        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'SignUp as su',
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'Login as li',
        })
        .state('product-home', {
            url: '/product-home',
            // views: {
            //     '': {
            //         templateUrl: 'views/product-home.html',
            //     },
            //     'columnOne@product-home': {
            //         templateUrl: 'views/products.html',
            //         controller: 'ProductHome as prodhm'
            //     },
            //     'columnTwo@product-home': {
            //         templateUrl: 'views/product-detail.html',
            //         controller: 'ProductDetail as proddtl',
            //     }
            // },
            templateUrl: 'views/product-home.html',
            controller: 'ProductHome as prodhm',
            resolve:{
                itemsList: function(Item){
                    return Item.list();
                }
            }
        // })
        // .state('productDetail', { //product/id
        //     url: '/product-detail',
        //     templateUrl: 'views/product-detail.html',
        //     // controller: 'ProductDetail as prod-dtl',
        //     resolve:{
        //         jokeInit: function(Joke){ //Joke=service
        //             return Joke.getJoke();
        //         }
        //     }
        });
    })
    .config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
		return {
			'request': function (config) {
				config.headers = config.headers || {};
				if ($localStorage.token) {
					config.headers.Authorization = $localStorage.token;
					config.headers['Access-Control-Allow-Origin'] = '*';
					config.headers['Content-Type'] = 'application/json';
				}
				return config;
			},
			'responseError': function (response) {
				if([401].indexOf(response.status)){
					delete $localStorage.token;
					$location.path('/login');
				}
				return $q.reject(response);
			}
		};
	}]);
}]);

})();
