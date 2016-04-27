(function(){
    angular.module('routerApp')
    .controller('Login', loginCtrl);

    function loginCtrl(UserAuth){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        self.login = login;

        // BOUND VALUES
        self.userObj = {
            email: '',
            password: ''
        };

        // BOUND FUNCTION IMPLEMENTATIONS
        function login(){
            if (!self.userObj.email || !self.userObj.password){
                alert('oops, you need to complete all fields!');
                return;
            }
            UserAuth.login(self.userObj)
                .then(function(response){
                    // console.log(response);
                    alert('Welcome back, ' + UserAuth.info.name + '! Happy shopping!');
                },
                function(response){
                    alert(response.data.message);
                });
            self.userObj = {
                email: '',
                password: ''
            };
        }
    }

        // HELPER FUNCTIONS

})();
