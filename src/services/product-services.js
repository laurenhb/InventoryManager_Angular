(function(){
    angular.module('routerApp')
    .factory('Item', item);

    function item($http){
        var link = 'http://wta-inventorybackend.herokuapp.com/api/v1/product';
        var _productArray = [];
        var service = {
            getProductArray: getProductArray,
            list: list,
            add: add,
            remove: remove,
            edit: edit,
            getDetail: getDetail
		};
		return service;

        function getProductArray () {
            return _productArray;
        }

        function getDetail(productId){
            for (var i = 0; i < _productArray.length; i++){
                if (_productArray[i].id === productId){
                    return _productArray[i];
                }
            }
        }

        function list(){
            return $http.get(link)
                .success(function(response){
                    for(var i = 0; i < response.length; i++) {
                        var product = new Product(response[i]);
                        _productArray.push(product);
                    }
                    return _productArray;
                });
        }

        function add(newItem){
            return $http.post(link, newItem)
                .success(function(data){
                    return data;
                });
        }

        function remove(id){
            return $http.delete(link + '/:' + id)
                .success(function(data){
                    return data;
                });
        }

        function edit(id, editItem){
            return $http.put(link + '/:' + id, editItem)
                .success(function(data){
                    return data;
                });
        }

        function Product(currentProduct){
            for (var key in currentProduct){
                this[key] = currentProduct[key];
            }
        }
    }

})();
