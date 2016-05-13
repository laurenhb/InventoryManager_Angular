(function(){
    angular.module('routerApp')
    .controller('Nav', navCtrl);

    function navCtrl(UserAuth, $scope){
        var self = this;
        // LOCAL VARIABLES

        // BOUND FUNCTIONS
        // self.getNav = getNav;
        self.logout = logout;
        self.isAuthed = isAuthed;

        // BOUND VALUES
        self.loggedIn = null;
        self.userRole = null;
        self.activeUser = {
            name: '',
            email: '',
            role: '',
            id: ''
        };
        $scope.$watch(function(){
            return UserAuth.info;
        }, function(newVal,oldVal){
            if(newVal){
                //change stuff
                self.activeUser.name = UserAuth.info.name;
                self.activeUser.email = UserAuth.info.email;
                self.activeUser.role = UserAuth.info.role;
                self.activeUser.id = UserAuth.info.id;
                self.loggedIn = self.activeUser.name;
                self.userRole = self.activeUser.role;
                console.log('self.userRole: ' + self.userRole);
                console.log('self.loggedIn: ' + self.loggedIn);
                console.log('self.activeUser: ' + self.activeUser);
            }
        });

        // BOUND FUNCTION IMPLEMENTATIONS
        isAuthed();
        function isAuthed(){
            UserAuth.isAuthed();
        }

        function logout(){
            UserAuth.logout();
            self.loggedIn = null;
            self.userRole = null;
            self.activeUser = {
                name: '',
                email: '',
                role: '',
                id: ''
            };
            console.log('self.userRole: ' + self.userRole);
            console.log('self.loggedIn: ' + self.loggedIn);
            console.log('self.activeUser: ' + self.activeUser);
            alert('Logout successful - see you later!');
        }
    }

        // HELPER FUNCTIONS

})();
