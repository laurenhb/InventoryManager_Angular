(function(){
    angular.module('routerApp')
    .controller('ProductHome', ['Item', 'itemsList', prodHmCtrl]);

    function prodHmCtrl(Item, itemsList){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        self.detail = detail;

        // BOUND VALUES
        self.productArray = [];
        self.fullDetail = null;
        self.detailItem = {
            id: '',
            name: '',
            description: '',
            price: ''
        };

        // BOUND FUNCTION IMPLEMENTATIONS
        self.productArray = itemsList.data;
        console.log(self.productArray);

        function detail(item){
            // Item.detail(id);
            self.fullDetail = item.id;
            self.detailItem.id = item.id;
            self.detailItem.name = item.name;
            self.detailItem.description = item.description;
            self.detailItem.price = item.price;
        }


    }

        // HELPER FUNCTIONS

})();
