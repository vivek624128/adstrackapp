/**
 * Created by Vivek Kumar on 12/5/2015.
 */


NEC.controller('appCtrl', function ($scope, $rootScope, $http, $window, $location, $state) {

    $scope.changeLoc = function (val) {
        $state.go(val)
    }

    $scope.user = localStorage.getItem('user');
    if($scope.user !='services'){
        $state.go('admin.signIn');
    }

    $scope.logout = function () {
        $state.go('admin.signIn');
    }




});

