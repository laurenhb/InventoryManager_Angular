(function(){
    angular.module('routerApp')
    .controller('ProductDetail', prodDtlCtrl);

    function prodDtlCtrl(Item, $state){
        var self = this;
        // LOCAL VARIABLES
        var productArray = Item.getProductArray();

        // BOUND FUNCTIONS
        self.getDetail = getDetail;
        self.state = $state;

        // BOUND VALUES
        self.productId = parseInt($state.params.productId);
        self.detailItem = {
            id: '',
            name: '',
            description: '',
            price: '',
            imgThumbnail: ''
        };

        // BOUND FUNCTION IMPLEMENTATIONS
        getDetail();
        function getDetail(){
            for (var i = 0; i < productArray.length; i++){
                if (productArray[i].id === self.productId){
                    self.detailItem = productArray[i];
                }
            }
        }
    }

        // HELPER FUNCTIONS

})();
