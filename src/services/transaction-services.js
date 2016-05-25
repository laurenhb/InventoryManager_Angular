(function(){
    angular.module('routerApp')
    .factory('Trans', trans);

    function trans($http){
        var _transArray = [];
        var _orderArray = [];
        var service = {
            list: list,
            getOrders: getOrders,
            add: add,
            edit: edit,
            getOrderDetail: getOrderDetail
		};
		return service;

        function getOrderDetail(transId){
            // for (var i = 0; i < _orderArray.length; i++){
            //     if (_orderArray[i].id === transId){
            //         console.log('orderArray info', _orderArray[i]);
            //         return _orderArray[i];
                // }
            // }
            return $http.get('http://wta-inventorybackend.herokuapp.com/api/v1/transaction/' + transId)
                .success(function (response){
                     console.log('order detail info', response);
                    return response;
                });
        }

        function list(){
            return $http.get('http://wta-inventorybackend.herokuapp.com/api/v1/transaction')
                .success(function(response){
                    for(var i = 0; i < response.length; i++) {
                        _transArray.push(response[i]);
                    }
                    // return response;
                    return _transArray;
                });
        }

        function getOrders(){
            return $http.get('http://wta-inventorybackend.herokuapp.com/api/v1/user/orders')
                .success(function(response){
                    for(var i = 0; i < response.length; i++) {
                        _orderArray.push(response[i]);
                    }
                    return _orderArray;
                    // return response;
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
            return $http.put('http://wta-inventorybackend.herokuapp.com/api/v1/transaction/' + transId, editTrans)
                .success(function(response){
                    return response;
                });
        }

    }

})();
