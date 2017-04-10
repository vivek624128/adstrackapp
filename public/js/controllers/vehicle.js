/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('vehicleCtrl', function ($scope, $rootScope, $http, apiService) {
    $scope.vehicleData = {};
    $scope.vehicleData.vehicleType = 'Mini Truck';
    $scope.updateData = {};
    $scope.addVehicle = function () {
        $scope.vehicleData.attachDate = moment().format();
        console.log($scope.vehicleData)
        apiService.addVehicle($scope.vehicleData).then(function (data) {
            console.log(data.data);
            $scope.listVehicle();
        })
    }
    $scope.updateVehicle = function () {
        console.log($scope.updateData)
        apiService.editVehicle($scope.updateData).then(function (data) {
            console.log(data.data);
            $scope.closePopup('.popup.vehicleEdit');
            $scope.msg = "Updated Successfully"
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
    $scope.listVehicleById = function (id) {
        apiService.vehicleDetailById(id).then(function (data) {
            $scope.selectedVehicleData = data.data[0];
            $scope.updateData._id = data.data[0]._id;
            $scope.updateData.projectId = data.data[0].projectId[0]._id;
            $scope.updateData.projectName = data.data[0].projectId[0].projectName;
            $scope.updateData.driverId = data.data[0].driverId[0]._id;
            $scope.updateData.driverName = data.data[0].driverId[0].fullName;
            $scope.updateData.vehicleType = data.data[0].vehicleType;
            $scope.updateData.vehicleNo = data.data[0].vehicleNo;
            $scope.updateData.registrationNo = data.data[0].registrationNo;


            $scope.vehicleData._id = data.data[0]._id;
            // $scope.vehicleData.projectId = data.data[0]._id;
        })
    }
    $scope.listUsers();

    $scope.listVehicle();

    $scope.closePopup =function (popup) {
        setTimeout(function () {
            $(popup).fadeOut(250)
            $('.background').fadeOut(250)
        },250)
    }
});

