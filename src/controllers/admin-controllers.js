(function(){
    angular.module('routerApp')
    .controller('Admin', ['Item', 'itemsList', adminCtrl]);

    function adminCtrl(Item, itemsList){
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

        // BOUND VALUES
        self.prodArray = [];
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

        // BOUND FUNCTION IMPLEMENTATIONS
        self.prodArray = itemsList.data;

        function add(){
            if (!self.newItem.id || !self.newItem.name || !self.newItem.description || !self.newItem.amt || !self.newItem.cost || !self.newItem.price ||!self.newItem.imgThumbnail){
                return;
            }
            Item.add({
                id: self.newItem.id,
                name: self.newItem.name,
                description: self.newItem.description,
                amt: self.newItem.amt,
                cost: self.newItem.cost,
                price: self.newItem.price,
                imgThumbnail: self.newItem.imgThumbnail
            }).then(function(response){
                self.newItem.id = response.data;
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

        function saveEdit(id){
            Item.edit(id, self.editItem).then(function(response){
                for (var i=0; i<self.prodArray.length; i++){
                    if (self.prodArray[i].id === id){
                        self.prodArray[i] = response.data;
                        self.prodArray[i].id = id;
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
    }

        // HELPER FUNCTIONS

})();
