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
            $scope.closePopup();
            $scope.uploadData ={};

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


    $scope.closePopup =function () {
        setTimeout(function () {
            $('.popup.user').fadeOut(100)
            $('.background').fadeOut(100)
        },100)
    }

    $scope.deleteUser = function (id) {
        apiService.deleteUser(id).then(function (data) {
            $scope.getUserList();
        })
    }
});

