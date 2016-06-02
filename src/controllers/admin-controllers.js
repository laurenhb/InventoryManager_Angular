(function(){
    angular.module('routerApp')
    .controller('Admin', ['Item', 'itemsList', 'Trans', 'transList', adminCtrl]);

    function adminCtrl(Item, itemsList, Trans, transList){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        self.add = add;
        self.deleteItem = deleteItem;
        self.edit = edit;
        self.saveEdit = saveEdit;
        self.noEditMode = noEditMode;
        self.noAddMode = noAddMode;
        self.addModeOn = addModeOn;
        self.addTrans = addTrans;
        self.showModal = showModal;
        self.updateSub = updateSub;
        self.clearTransByProd = clearTransByProd;
        self.transByProd = transByProd;

        // BOUND VALUES
        self.currentProduct = {
            id: '',
            name: '',
            description: '',
            amt: '',
            cost: '',
            price: '',
            imgThumbnail: ''
        };
        self.prodArray = [];
        self.transArray = [];
        self.transByProdArray = [];
        self.prodSummArray = [];
        self.newItem = {
            id: '',
            name: '',
            description: '',
            amt: '',
            cost: '',
            price: '',
            imgThumbnail: ''
        };
        self.editMode = null;
        self.addMode = null;
        self.editItem = {
            id: '',
            name: '',
            description: '',
            amt: '',
            cost: '',
            price: '',
            imgThumbnail: ''
        };
        self.newTrans = {
            type: {
                description: '',
                id: ''
            },
            date: '',
            note: '',
            altersId:'',
            subTransactions: []
        };
        self.transSub = '';
        self.transQty = '';
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
        self.prodArray = itemsList.data;
        self.transArray = transList.data;
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

        function add(){
            if (!self.newItem.name || !self.newItem.description || !self.newItem.amt || !self.newItem.cost || !self.newItem.price ||!self.newItem.imgThumbnail){
                return;
            }
            Item.add({
                // id: self.newItem.id,
                name: self.newItem.name,
                description: self.newItem.description,
                amt: self.newItem.amt,
                cost: self.newItem.cost,
                price: self.newItem.price,
                imgThumbnail: self.newItem.imgThumbnail
            }).then(function(response){
                self.newItem.id = response.data.id;
                self.prodArray.push(self.newItem);
                self.newItem = {
                    id: '',
                    name: '',
                    description: '',
                    amt: '',
                    cost: '',
                    price: '',
                    imgThumbnail: ''
                };
            });

        }

        function deleteItem(id){
            Item.remove(id)
            .then(function(response){
                for (var i=0; i<self.prodArray.length; i++){
                    if (self.prodArray[i].id === id){
                        self.prodArray.splice(i, 1);
                        break;
                    }
                }
                console.log(self.prodArray);
            });
        }

        function edit(item){
            console.log(item);
            self.editItem.id = item.id;
            self.editItem.name = item.name;
            self.editItem.description = item.description;
            self.editItem.amt = item.amt;
            self.editItem.cost = item.cost;
            self.editItem.price = item.price;
            self.editItem.imgThumbnail = item.imgThumbnail;
            self.editMode = item.id;
            console.log('editItem.id: ' + self.editItem.id);
            console.log('editMode: ' + self.editMode);
        }

        function noEditMode(){
            self.editMode = null;
        }

        function noAddMode(){
            self.addMode = null;
        }

        function addModeOn(){
            self.addMode = true;
        }

        function saveEdit(prod){
            Item.edit(prod.id, self.editItem).then(function(response){
                for (var i=0; i<self.prodArray.length; i++){
                    if (self.prodArray[i].id === prod.id){
                        self.prodArray[i] = response.data;
                        self.prodArray[i].id = prod.id;
                        console.log(self.prodArray);
                        self.editMode = null;
                        break;
                    }
                }
                self.editItem = {
                    id: '',
                    name: '',
                    description: '',
                    amt: '',
                    cost: '',
                    price: '',
                    imgThumbnail: ''
                };
            });
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
            },
            function(response){
                alert(response.data.message);
            });
        }

        function clearTransByProd(){
            self.transByProdArray = [];
        }

        function transByProd(item){
            showModal(item);
            Trans.transByProd(item.id)
            .then(function(response){
                console.log(response);
                for (var i = 0; i < response.data.length; i++){
                    self.transByProdArray.push(response.data[i]);
                }
            });
        }

    }

        // HELPER FUNCTIONS

})();
