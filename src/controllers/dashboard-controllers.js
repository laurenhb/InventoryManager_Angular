(function(){
    angular.module('routerApp')
    .controller('Dashboard', ['Trans', 'transList', dashCtrl]);

    function dashCtrl(Trans, transList, $state){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        self.edit = edit;
        // self.saveEdit = saveEdit;
        // self.noEditMode = noEditMode;
        self.showModal = showModal;
        self.clearCurrentTrans = clearCurrentTrans;


        // BOUND VALUES
        self.transArray = [];
        self.editMode = null;
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


        // BOUND FUNCTION IMPLEMENTATIONS
        self.transArray = transList.data;

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
        }

    }

        // HELPER FUNCTIONS

})();
