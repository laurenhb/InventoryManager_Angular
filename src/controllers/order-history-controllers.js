(function(){
    angular.module('routerApp')
    .controller('OrderHistory', ['Trans', 'orderHist', ordHistCtrl]);

    function ordHistCtrl(Trans, orderHist, $state){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        self.state = $state;

        // BOUND VALUES
        self.userId = parseInt($state.params.userId);
        self.orderArray = [];


        // BOUND FUNCTION IMPLEMENTATIONS
        self.orderArray = orderHist.data;
        console.log('orderArray: ' + self.orderArray);

        // getOrders();
        // function getOrders(){
        //     for (var i = 0; i < productArray.length; i++){
        //         if (productArray[i].id === self.productId){
        //             self.detailItem = productArray[i];
        //         }
        //     }
        // }


    }

        // HELPER FUNCTIONS

})();
