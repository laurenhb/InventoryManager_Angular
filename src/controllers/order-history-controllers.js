(function(){
    angular.module('routerApp')
    .controller('OrderHistory', ['Trans', 'orderList', ordHistCtrl]);

    function ordHistCtrl(Trans, orderList, $state){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        self.state = $state;
        self.makeReturn = makeReturn;
        self.showModal = showModal;
        self.clearCurrentTrans = clearCurrentTrans;
        self.isReturn = isReturn;
        self.cancelReturn = cancelReturn;

        // BOUND VALUES
        self.orderArray = [];
        self.isSale = 'Sale';
        self.returnQty = '';
        self.currentTransProduct = '';
        self.editTrans = {
            type: {
                description: '',
                id: ''
            },
            date: '',
            notes: '',
            altersId:'',
            subTransactions: []
        };
        self.currentTrans = {
            id: '',
            date: '',
            totalPrice: '',
            totalCost: '',
            totalAmt: '',
            subTransactions: []
        };
        self.returnOptions = [
            {
                id: 5,
                description: 'Returned'
            },
            {
                id: 6,
                description: 'Returned Defective'
            }
        ];

        // BOUND FUNCTION IMPLEMENTATIONS
        self.orderArray = orderList.data;
        console.log('orderArray: ' + self.orderArray);

        function isReturn(productId){
            for (var i = 0; i < self.currentTrans.subTransactions.length; i++){
                if (self.currentTrans.subTransactions[i].productId === productId){
                    self.currentTrans.subTransactions[i].isReturn = true;
                }
            }
        }

        function cancelReturn(productId){
            for (var i = 0; i < self.currentTrans.subTransactions.length; i++){
                if (self.currentTrans.subTransactions[i].productId === productId){
                    self.currentTrans.subTransactions[i].isReturn = null;
                }
            }
        }

        function clearCurrentTrans(){
            self.currentTrans = {
                id: '',
                date: '',
                totalPrice: '',
                totalCost: '',
                totalAmt: '',
                subTransactions: []
            };
        }

        function showModal(trans) {
            Trans.getOrderDetail(trans.id)
                .then(function(response){
                    self.currentTrans.id = response.data.id;
                    self.currentTrans.date = response.data.date;
                    self.currentTrans.totalPrice = response.data.totalPrice;
                    self.currentTrans.totalCost = response.data.totalCost;
                    self.currentTrans.totalAmt = response.data.totalAmt;
                    for (var i = 0; i < response.data.subTransactions.length; i++){
                        self.currentTrans.subTransactions.push(response.data.subTransactions[i]);
                    }
                    console.log('currentTrans info', self.currentTrans);
                });
        }

        function makeReturn(order){
            for (var i = 0; i < self.currentTrans.subTransactions.length; i++){
                self.editTrans.subTransactions.push({
                    id: self.currentTrans.subTransactions[i].productId,
                    qty: self.returnQty
                });
            }
            self.editTrans.date = new Date();
            self.editTrans.altersId = self.currentTrans.id;
            console.log(angular.copy(self.editTrans));
            Trans.add(self.editTrans)
            .then(function(response){
                self.editTrans = {
                    type: {
                        description: '',
                        id: ''
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
                self.currentTrans = {
                    id: '',
                    date: '',
                    totalPrice: '',
                    totalCost: '',
                    totalAmt: '',
                    subTransactions: []
                };
            });
        }

    }

        // HELPER FUNCTIONS

})();
