(function(){
    angular.module('routerApp')
    .controller('Dashboard', ['Trans', 'transList', 'Item', 'prodSummList', dashCtrl]);

    function dashCtrl(Trans, transList, Item, prodSummList, $state){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        self.edit = edit;
        self.saveEdit = saveEdit;
        self.showModal = showModal;
        self.clearCurrentTrans = clearCurrentTrans;
        self.selectTab = selectTab;

        // BOUND VALUES
        self.transArray = [];
        self.transSummArray = [];
        self.prodSummArray = [];
        self.editMode = null;
        self.isSelected = null;
        self.editTrans = {
            type: {
                description: '',
                id: ''
            },
            date: '',
            note: '',
            altersId:'',
            subTransactions: []
        };
        self.currentTrans = {
            id: '',
            date: '',
            totalPrice: '',
            totalCost: '',
            totalAmt: '',
            subTransactions: [],
            note: '',
            type: null
        };
        self.editQty = '';
        self.transOptions = [
            {
                id: 1,
                description: 'Sale'
            },
            {
                id: 2,
                description: 'Lost/Stolen'
            },
            {
                id: 3,
                description: 'Returned to Supplier'
            },
            {
                id: 4,
                description: 'Inventory Purchase'
            },
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
        self.transArray = transList.data;
        self.prodSummArray = prodSummList.data;

        function selectTab(num){
            self.isSelected = num;
        }

        function showModal(trans) {
            Trans.getOrderDetail(trans.id)
                .then(function(response){
                    console.log('response info', response.data);
                    self.currentTrans.id = response.data.id;
                    self.currentTrans.date = response.data.date;
                    self.currentTrans.totalPrice = response.data.totalPrice;
                    self.currentTrans.totalCost = response.data.totalCost;
                    self.currentTrans.totalAmt = response.data.totalAmt;
                    for (var i = 0; i < response.data.subTransactions.length; i++){
                        self.currentTrans.subTransactions.push(response.data.subTransactions[i]);
                    }
                    // for (var j = 0; j < response.data.subTransactions.length; j++){
                    //     self.editTrans.subTransactions.push({
                    //         id: response.data.subTransactions[j].productId,
                    //         qty: response.data.subTransactions[j].amt
                    //     });
                    // }
                    self.editTrans.note = response.data.note;
                    self.currentTrans.type = response.data.type.id;
                    console.log('currentTrans info', self.currentTrans);
                    console.log('editTrans info', self.editTrans);
                });
        }

        function edit(id){
            // console.log(item);
            self.editMode = id;
            // console.log('editItem.id: ' + self.editItem.id);
            // console.log('editMode: ' + self.editMode);
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
            self.editTrans = {
                type: {
                    description: '',
                    id: ''
                },
                date: '',
                note: '',
                altersId:'',
                subTransactions: []
            };
            self.editMode = null;
        }

        function saveEdit(trans){
            for (var i = 0; i < self.currentTrans.subTransactions.length; i++){
                self.editTrans.subTransactions.push({
                    id: self.currentTrans.subTransactions[i].productId,
                    qty: self.currentTrans.subTransactions[i].amt
                });
            }
            for (var j = 0; j < self.transOptions.length; j++){
                if (self.transOptions[j].id === self.currentTrans.type){
                    self.editTrans.type.id = self.transOptions[j].id;
                    self.editTrans.type.description = self.transOptions[j].description;
                }
            }
            self.editTrans.date = new Date();
            // self.editTrans.altersId = self.currentTrans.id;
            console.log(angular.copy(self.editTrans));
            Trans.edit(self.editTrans, self.currentTrans.id)
            .then(function(response){
                console.log('response.data for trans edit: ', response);
                for (var i=0; i<self.transArray.length; i++){
                    if (self.transArray[i].id === self.currentTrans.id){
                        self.transArray[i] = response.data;
                        self.transArray[i].id = self.currentTrans.id;
                        console.log(self.transArray);
                        self.editMode = null;
                        break;
                    }
                }
                self.editTrans = {
                    type: {
                        description: '',
                        id: ''
                    },
                    date: '',
                    note: '',
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
                clearCurrentTrans();
            });
        }

    }

        // HELPER FUNCTIONS

})();
