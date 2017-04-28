/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('userTypeCtrl', function ($scope, $rootScope, $http, apiService) {
    $scope.uploadData = {};
    $scope.uploadData.userType = '';
    $scope.addNewUserType = function () {
        if($scope.uploadData.userType!=''){
            apiService.newUserType($scope.uploadData).then(function (data) {
                console.log(data.data);
                $scope.uploadData.userType = '';
                $scope.listUserType();
            })
        }

    }

    $scope.loader = true;
    $scope.listUserType = function () {
        apiService.listUserType().then(function (data) {
            $scope.loader = false;
            $scope.userTypeList = data.data;
        })
    }
    $scope.listUserType();
});

