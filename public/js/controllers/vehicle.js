/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('vehicleCtrl', function ($scope, $rootScope, $http, apiService) {
    $scope.vehicleData = {};
    $scope.vehicleData.vehicleType = 'Mini Truck';
    $scope.addVehicle = function () {
        $scope.vehicleData.attachDate = moment().format();
        console.log($scope.vehicleData)
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
            console.log(data.data)
        })
    }
    apiService.projectList().then(function (data) {
        $scope.projectList = data.data;
        $scope.vehicleData.projectId = data.data[0]._id;
    })
    $scope.listUsers();

    $scope.listVehicle();
});

