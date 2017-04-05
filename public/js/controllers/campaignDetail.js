/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('campaignDetailCtrl', function ($scope, $rootScope, $http, $window, $location, $stateParams, apiService, $timeout) {
    $scope.campaignData = {};
    $scope.id = $stateParams.id;

    $scope.newLink = {};
    $scope.newLink.campaignId=$scope.id;
    $scope.newLink.data = {};
    $scope.newLink.data.assignDate = moment().format();
    $scope.loader = true;
    $scope.listCampaign = function () {

        apiService.campaignList($scope.id).then(function (data) {
            $scope.loader = false;
            $scope.campaignList = data.data;
        })
    }
    $scope.listCampaign();

    apiService.vehicleList().then(function (data) {
        $scope.loader = false;
        $scope.vehicleList = data.data;
    })

    $scope.selectVehicle = function (id) {
        $scope.newLink.data.vehicleId = id;
        apiService.vehicleDetailById(id).then(function (data) {
            // console.log(data.data)
            $scope.vehicleDriver = data.data[0].driverId[0].fullName;
            $scope.newLink.data.user = data.data[0].driverId[0]._id;
        })
    }

    $scope.linkVehicle = function () {
        apiService.linkVehicle($scope.newLink).then(function (data) {
            $scope.listCampaign();
            $scope.closePopup();
        })
    }

    $scope.closePopup = function () {
        setTimeout(function () {
            $('.popup.linkVehicle').fadeOut(100)
            $('.background').fadeOut(100)
        }, 100)
    }

});

