(function(){
    angular.module('routerApp', ['ui.router', 'ngStorage'])
    .config(function($stateProvider, $urlRouterProvider, $localStorageProvider){

        $urlRouterProvider.otherwise('/home');

        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'SignUp as su'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'Login as li'
        })
        .state('product-home', {
            url: '/product',
            templateUrl: 'views/product-home.html',
            controller: 'ProductHome as prodhm',
            resolve:{
                itemsList: function(Item){
                    return Item.list();
                }
            }
        })
        .state('productDetail', {
            url: '/product/:productId',
            templateUrl: 'views/product-detail.html',
            controller: 'ProductDetail as proddtl',
            resolve:{
                itemsList: function(Item){
                    return Item.list();
                }
            }
        })
        .state('order-hist', {
            url: '/user/orders',
            templateUrl: 'views/order-history.html',
            controller: 'OrderHistory as ordhist',
            resolve:{
                orderList: function(Trans){
                    return Trans.getOrders();
                }
            }
        })
        .state('dashboard', {
            url:'/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'Dashboard as dsh',
            resolve:{
                transList: function(Trans){
                    return Trans.list();
                }
            }
        // })
        // .state('trans-dtl',{
        //     url: '/transaction/:transId',
        //     templateUrl: 'views/transaction-detail.html',
        //     controller: 'TransactionDetail as transdtl'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'views/admin.html',
            controller: 'Admin as ad',
            resolve:{
                itemsList: function(Item){
                    return Item.list();
                },
                transList: function(Trans){
                    return Trans.list();
                }
            }
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
