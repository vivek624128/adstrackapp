/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('vehicleCtrl', function ($scope, $rootScope, $http, apiService) {
    $scope.uploadData = {};
    $scope.vehicleData = function () {
        apiService.addVehicle($scope.vehicleData).then(function (data) {
            console.log(data.data);
            $scope.listVehicle();
        })
    }

    $scope.listVehicle = function () {
        apiService.vehicleList().then(function (data) {
            $scope.vehicleList = data.data;
        })
    }
    $scope.listUsers = function () {
        apiService.userList().then(function (data) {
            $scope.userList = data.data;
        })
    }
    $scope.listVehicle();
});

