(function(){
    angular.module('routerApp')
    .controller('ProductDetail', prodDtlCtrl);

    function prodDtlCtrl(Item, $state){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        self.state = $state;

        // BOUND VALUES
        self.detailItem = {
            id: '',
            name: '',
            description: '',
            price: '',
            imgThumbnail: ''
        };

        // BOUND FUNCTION IMPLEMENTATIONS
        self.detailItem = Item.getDetail(parseInt($state.params.productId));

    }

        // HELPER FUNCTIONS

})();
