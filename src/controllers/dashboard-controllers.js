(function(){
    angular.module('routerApp')
    .controller('Dashboard', ['Trans', 'transList', dashCtrl]);

    function dashCtrl(Trans, transList, $state){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS

        // BOUND VALUES
        self.transArray = [];

        // BOUND FUNCTION IMPLEMENTATIONS
        self.transArray = transList.data;

    }

        // HELPER FUNCTIONS

})();
