/**
 * Created by Suhas on 12/5/2015.
 */


NEC.controller('loginCtrl', function ($scope,$rootScope, $http, $window, $location, $state) {

    $scope.user={};
    $scope.checkValidation = function (user) {
        if (user.userId == 'services' && user.password == 'QHash3' ){
            localStorage.setItem('user','services');
            $scope.loginLoader = false;
            $state.go('app.user');
        }
        else{
            $scope.error = 'Error: Invalid user or password';
            $scope.welcome = '';
            $scope.loginLoader = false;
        }

    }
    /*$scope.checkValidation = function (user) {
        $scope.loginLoader = true;

        $http
            .post($rootScope.baseUrl+'/user/validateLogin', user)
            .success(function (data, status, headers, config) {
                console.log(data[0].statusCode)
                if(data[0].statusCode==200){
                    localStorage.setItem('user',user.userId);
                    $scope.loginLoader = false;
                    $state.go('app.workspace.dashboard')
                }
                else{
                    $scope.error = 'Error: Invalid user or password';
                    $scope.welcome = '';
                    $scope.loginLoader = false;
                }


            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                /!*delete $window.sessionStorage.token;
                $scope.isAuthenticated = false;
                // Handle login errors here
                $scope.error = 'Error: Invalid user or password';
                $scope.welcome = '';
                $scope.loginLoader = false;*!/
            });
    };*/

    $scope.logout = function () {
        delete $window.sessionStorage.token;
        console.log($window.sessionStorage.token);
        $state.go('/login')
    };
    $scope.signUp = function (user) {
        console.log("_____inside login_____________");
        console.log(user);
        $http
            .post('/signup', user)
            .success(function (data, status, headers, config) {
                console.log(data);
                $scope.successMessage = "Successfully registered Please login";
                $state.go('admin.signIn')
            })
            .error(function (data, status, headers, config) {
                $scope.error = data;
            });
    };

    $scope.enterToLogin = function (event) {
        if(event.keyCode == 13) {
            $scope.checkValidation($scope.user);
        }
    }
});

