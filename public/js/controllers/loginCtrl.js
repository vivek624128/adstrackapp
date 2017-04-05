/**
 * Created by Suhas on 12/5/2015.
 */


NEC.controller('loginCtrl', function ($scope,$rootScope, $http, $window, $location, $state, apiService) {

    $scope.user={};
    $scope.checkValidation = function (user) {
        $scope.user.permission = 'Web';
        /*if (user.userId == 'services' && user.password == 'QHash3' ){
            localStorage.setItem('user','services');
            $scope.loginLoader = false;
            $state.go('app.user');
        }
        else{
            $scope.error = 'Error: Invalid user or password';
            $scope.welcome = '';
            $scope.loginLoader = false;
        }
*/
        apiService.authenticate($scope.user).then(function (data) {
            console.log(data.data)
            var result = data.data[0];
            if(result.statusCode == 200){
                $scope.loginLoader = false;
                $state.go('app.user');
            }
            else{
                $scope.error = result.Description;
            }
        })


    };

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

