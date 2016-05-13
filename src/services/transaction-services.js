(function(){
    angular.module('routerApp')
    .factory('Trans', trans);

    function trans($http){
        var service = {
            list: list,
            getOrders: getOrders,
            add: add
		};
		return service;

        function list(){
            return $http.get('http://wta-inventorybackend.herokuapp.com/api/v1/transaction')
                .success(function(response){
                    return response;
                });
        }

        function getOrders(userId){
            return $http.get('http://wta-inventorybackend.herokuapp.com/api/v1/user/:' + userId + '/orders')
                .success(function(response){
                    return response;
                });
        }

        function add(newTrans){
            return $http.post('http://wta-inventorybackend.herokuapp.com/api/v1/transaction', newTrans)
                .success(function(response){
                    console.log(response);
                    return response;
                });
        }

    }

})();
