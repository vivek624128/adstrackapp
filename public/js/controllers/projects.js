/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('projectsCtrl', function ($scope, $rootScope, $http, $window, $location, $state, apiService) {
    $scope.projectData = {};
    $scope.projectData.projectStatus = 'Active';
    $scope.projectData.creationDate = moment().format();

    apiService.adsCategory().then(function (data) {
        $scope.adsCategory = data.data;
    })

    apiService.userList().then(function (data) {
        $scope.userList = data.data;
        console.log(data.data)
    })

    $scope.addProject = function () {
        console.log($scope.projectData)
        apiService.addProject($scope.projectData).then(function (data) {
            console.log(data.data);
            $scope.listProject();
            $scope.closePopup();
            $scope.projectData= {};

        })
    }

    $scope.listProject = function () {
        apiService.projectList().then(function (data) {
            $scope.projectList = data.data;
        })
    }
    $scope.listProject();
    $scope.closePopup =function () {
        setTimeout(function () {
            $('.popUp.customer').hide(100)
        },100)
    }
});

