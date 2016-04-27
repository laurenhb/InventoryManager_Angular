(function(){
    angular.module('routerApp')
    .controller('SignUp', signupCtrl);

    function signupCtrl(UserAuth){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        self.createUser = createUser;

        // BOUND VALUES
        self.newUserObj = {
            fName: '',
            lName: '',
            email: '',
            password: ''
        };

        // BOUND FUNCTION IMPLEMENTATIONS
        function createUser(){
            if (!self.newUserObj.fName || !self.newUserObj.lName || !self.newUserObj.email || !self.newUserObj.password){
                alert('oops, you need to complete all fields!');
                return;
            }
            UserAuth.join(self.newUserObj)
                .then(function(response){
                    alert('Welcome, ' + response.data.fName + '! Happy shopping!');
                },
                function(response){
                    alert(response.data.message);
                });
            self.newUserObj = {
                fName: '',
                lName: '',
                email: '',
                password: ''
            };
        }
    }

        // HELPER FUNCTIONS

})();
