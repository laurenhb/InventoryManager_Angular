(function(){
    angular.module('routerApp')
    .controller('Login', loginCtrl);

    function loginCtrl(UserAuth){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        self.login = login;
        self.logout = logout;

        // BOUND VALUES
        self.userObj = {
            email: '',
            password: ''
        };
        self.loggedIn = false;
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
                    // console.log(response);
                    alert(response.data.message);
                    self.loggedIn = true;
                });
            self.userObj = {
                email: '',
                password: ''
            };
        }
        function logout(){
            UserAuth.logout();
            self.loggedIn = false;
            alert('Logout successful - see you later!');
        }
    }

        // HELPER FUNCTIONS

})();
