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

        // BOUND VALUES
        self.orderArray = [];
        self.isSale = 'Sale';
        self.orderQty = '';
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
            note: '',
            type: {
                description: '',
                id: ''
            },
            date: '',
            totalPrice: '',
            totalCost: '',
            totalAmt: ''
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

        function showModal(trans) {
            self.currentTrans.id = trans.id;
            self.currentTrans.note = trans.name;
            self.currentTrans.type.description = trans.type.description;
            self.currentTrans.type.id = trans.type.id;
            self.currentTrans.date = trans.date;
            self.currentTrans.totalPrice = trans.totalPrice;
            self.currentTrans.totalCost = trans.totalCost;
            self.currentTrans.totalAmt = trans.totalAmt;
        }
        function makeReturn(order){
            // console.log('trans: ', angular.copy(trans));
            // console.log(typeof self.editTrans.type.id);
            // self.editTrans.subTransactions.push({
            //     id: self.currentProduct.id,
            //     qty: self.orderQty
            // });
            self.editTrans.date = new Date();
            self.editTrans.altersId = self.currentTrans.id;
            // console.log(angular.copy(self.editTrans));
            Trans.edit(self.editTrans, self.currentTrans.id)
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
            },
            function(response){
                alert(response.data.message);
            });
        }

    }

        // HELPER FUNCTIONS

})();
