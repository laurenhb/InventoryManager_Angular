(function(){
    angular.module('routerApp')
    // .controller('Dashboard', ['Trans', 'transList', dashCtrl]);
    .controller('Dashboard', dashCtrl);

    // function dashCtrl(Item, Trans, transList, $state){
    function dashCtrl(Item, Trans){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        // self.getTransactions = getTransactions;

        // BOUND VALUES
        self.transArray = [];

        // BOUND FUNCTION IMPLEMENTATIONS
        getTransactions();
        function getTransactions(){
            Trans.list()
                .then(function(response){
                    self.transArray = response.data;
                });
        }
        // console.log(transList.data);
        // self.transArray = transList.data;
        // console.log(self.transArray);

    }

        // HELPER FUNCTIONS

})();
