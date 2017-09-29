/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('userCtrl', function ($scope, $rootScope, $http, apiPath, $location, $state, $base64, $timeout, apiService) {

    $scope.uploadData = {};
    $scope.uploadData.userType = '';
    $scope.uploadData.permission = 'Web';


    apiService.selectUserType().then(function (data) {
        console.log(data.data)
        $scope.userType = data.data;
        $scope.uploadData.userType = $scope.userType[0].userType;
    })

    $scope.saveUser = function () {
        apiService.saveUser($scope.uploadData).then(function (data) {
            console.log(data)
            $scope.getUserList();
            $scope.closePopup('.popup.userAdd');
            $scope.uploadData ={};

        })
    }
    $scope.updateUser = function () {
        apiService.editUser($scope.uploadData).then(function (data) {
            console.log(data)
            $scope.getUserList();
            $scope.closePopup('.popup.user');

        })
    }

    $scope.loader=true;
    $scope.getUserList = function () {
        apiService.userListFull().then(function (data) {
            $scope.loader = false;
            $scope.userList = data.data;
        })
        console.log($scope.uploadData)
    }
    $scope.getUserList();


    $scope.closePopup =function (popup) {
        setTimeout(function () {
            $(popup).fadeOut(250)
            $('.background').fadeOut(250)
        },250)
    }

    $scope.deleteUser = function (id) {
        apiService.deleteUser(id).then(function (data) {
            $scope.getUserList();
        })
    }

    $scope.userData = function (userData) {
        $scope.uploadData =userData;
    }
});

