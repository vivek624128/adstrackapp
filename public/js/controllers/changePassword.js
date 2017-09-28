/**
 * Created by Vivek Kumar on 12/26/2016.
 */
mahaboudh.controller('changePasswordCtrl', function ($scope, $rootScope, $http, apiService) {
    $scope.userData = {};
    $scope.userData.userId = '';
    $scope.updatePassword = function () {
        if($scope.userData.userId!='' && $scope.userData.userId!='' && $scope.userData.userId!=''){
            apiService.changePassword($scope.userData).then(function (data) {
                console.log(data.data);
                if(data.data=='New Password Successfully changed !!...'){
                    $scope.msg = 'New Password Successfully changed !!...';
                }
                /*else{
                    $scope.error =
                }*/
            })
        }

    }

});

