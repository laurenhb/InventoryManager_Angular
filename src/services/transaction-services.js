(function(){
    angular.module('routerApp')
    .factory('Trans', trans);

    function trans($http){
        var service = {
            list: list,
            getOrders: getOrders,
            add: add,
            edit: edit
		};
		return service;

        function list(){
            return $http.get('http://wta-inventorybackend.herokuapp.com/api/v1/transaction')
                .success(function(response){
                    return response;
                });
        }

        function getOrders(){
            return $http.get('http://wta-inventorybackend.herokuapp.com/api/v1/user/orders')
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

        function edit(editTrans, transId){
            return $http.put('http://wta-inventorybackend.herokuapp.com/api/v1/transaction/:' + transId)
                .success(function(response){
                    return response;
                });
        }

    }

})();
