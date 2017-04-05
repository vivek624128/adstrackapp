/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('projectsCtrl', function ($scope, $rootScope, $http, $window, $location, $state, apiService,$timeout) {
    $scope.projectData = {};
    $scope.projectData.projectStatus = 'Active';
    $scope.projectData.creationDate = moment().format();

    apiService.adsCategory().then(function (data) {
        $scope.adsCategory = data.data;
        $scope.projectData.creationDate = moment().format();
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
    $scope.loader = true;
    $scope.listProject = function () {
        apiService.projectList().then(function (data) {
            $scope.loader = false;
            $scope.projectList = data.data;
        })
    }
    $scope.listProject();
    $scope.closePopup =function () {
        setTimeout(function () {
            $('.popup.project').fadeOut(100)
            $('.background').fadeOut(100)
        },100)
    }
});

