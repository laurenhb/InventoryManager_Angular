(function(){
    angular.module('routerApp')
    .controller('ProductDetail', prodDtlCtrl);

    function prodDtlCtrl(Item){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS

        // BOUND VALUES
        self.detailItem = {
            id: '',
            name: '',
            description: '',
            price: ''
        };

        // BOUND FUNCTION IMPLEMENTATIONS

        // Item.detail()
        //     .then(function(response){
        //         self.detailItem = response.data
        //     .then(function(response){
        //         return;
        //     });
        // });

    }

        // HELPER FUNCTIONS

})();
