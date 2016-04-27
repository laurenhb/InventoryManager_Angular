(function(){
    angular.module('routerApp')
    .controller('ProductHome', ['Item', 'itemsList', prodHmCtrl]);

    function prodHmCtrl(Item, itemsList, $state){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS

        // BOUND VALUES
        self.productArray = [];

        // BOUND FUNCTION IMPLEMENTATIONS
        self.productArray = itemsList.data;
    }

        // HELPER FUNCTIONS

})();
