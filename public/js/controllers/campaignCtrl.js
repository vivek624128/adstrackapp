/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('campaignCtrl', function ($scope, $rootScope, $http, $window, $location, $state, apiService,$timeout) {
    $scope.campaignData = {};
    $scope.campaignData.status = 'Active';
    $scope.campaignData.creationDate = moment().format();

    apiService.adsCategory().then(function (data) {
        $scope.adsCategory = data.data;
    })

    apiService.userList().then(function (data) {
        $scope.userList = data.data;
        console.log(data.data)
    })

    $scope.addCampaign = function () {
        console.log($scope.campaignData)
        apiService.newCampaign($scope.campaignData).then(function (data) {
            console.log(data.data);
            $scope.listCampaign();
            $scope.closePopup();
            $scope.campaignData= {};

        })
    }
    $scope.loader = true;
    $scope.listCampaign = function () {
        apiService.campaignList().then(function (data) {
            $scope.loader = false;
            $scope.campaignList = data.data;
        })
    }

    apiService.projectList().then(function (data) {
        $scope.projectList = data.data;
        $scope.campaignData.projectId = data.data[0]._id;
    })
    $scope.listCampaign();
    $scope.closePopup =function () {
        setTimeout(function () {
            $('.popup.campaign').fadeOut(100)
            $('.background').fadeOut(100)
        },100)
    }
});

