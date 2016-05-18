(function(){
    angular.module('routerApp')
    .controller('ProductHome', ['Item', 'itemsList', 'Trans', prodHmCtrl]);

    function prodHmCtrl(Item, itemsList, Trans, $state){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        self.updateSub = updateSub;
        self.showModal = showModal;
        self.addTrans = addTrans;

        // BOUND VALUES
        self.productArray = [];
        self.newTrans = {
            type: {
                description: 'Sale',
                id: 1
            },
            date: '',
            notes: '',
            altersId:'',
            subTransactions: []
        };
        self.currentProduct = {
            id: '',
            name: '',
            description: '',
            amt: '',
            cost: '',
            price: '',
            imgThumbnail: ''
        };
        self.transSub = '';

        // BOUND FUNCTION IMPLEMENTATIONS
        self.productArray = itemsList.data;
        function updateSub(){
            self.transSub = self.transQty * self.currentProduct.price;
        }
        function showModal(item) {
            self.currentProduct.id = item.id;
            self.currentProduct.name = item.name;
            self.currentProduct.description = item.description;
            self.currentProduct.amt = item.amt;
            self.currentProduct.cost = item.cost;
            self.currentProduct.price = item.price;
            self.currentProduct.imgThumbnail = item.imgThumbnail;
        }
        function addTrans(trans){
            console.log('trans: ', angular.copy(trans));
            console.log(typeof self.newTrans.type.id);
            self.newTrans.subTransactions.push({
                id: self.currentProduct.id,
                qty: self.transQty
            });
            self.newTrans.date = new Date();
            console.log(angular.copy(self.newTrans));
            Trans.add(self.newTrans)
            .then(function(response){
                self.newTrans = {
                    type: {
                        description: 'Sale',
                        id: 1
                    },
                    date: '',
                    notes: '',
                    altersId:'',
                    subTransactions: [
                        {
                            id: '',
                            qty: ''
                        }
                    ]
                };
            },
            function(response){
                alert(response.data.message);
            });
        }
    }

        // HELPER FUNCTIONS

})();
