(function(){
    angular.module('routerApp')
    .factory('UserAuth', userAuth);

    function userAuth($http, $localStorage){
        var service = {
            join: join,
            login: login,
            info: null,
            logout: logout,
            userRole: null,
            loggedIn: null,
            getNav: getNav,
            isAuthed: isAuthed
		};
		return service;

        function getNav(user){
            return user;
        }

        function isAuthed() {
            service.info = getClaimsFromToken();
            console.log(service.info);
            return service.info;
        }

        function join(obj){
            return $http.post('http://wta-inventorybackend.herokuapp.com/api/v1/signup', obj)
                .then(function(data){
                    return data;
                });
        }

        function login(obj){
            return $http.post('http://wta-inventorybackend.herokuapp.com/api/v1/login', obj)
                .then(function(result){
                    successAuth(result.data);
                    return result.data;
                });
        }

        function logout(){
            service.userRole = null;
            service.loggedIn = null;
            delete $localStorage.token;
        }

        //HELPER FUNCTIONS
        function successAuth(res) {
            console.log('success - auth');
            $localStorage.token = res.token;
            service.info = getClaimsFromToken();
            // service.loggedIn = service.info.name;
            // service.userRole = service.info.role;
            console.log(service.info);
        }

        function getClaimsFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            // console.log(user);
            service.userRole = user.role;
            service.loggedIn = true;
            console.log('userRole: ' + service.userRole);
            getNav(user);
            return user;
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

    }

})();
