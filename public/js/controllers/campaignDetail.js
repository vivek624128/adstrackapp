/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('campaignDetailCtrl', function ($scope, $rootScope, $http, $window, $location, $stateParams, apiService, $timeout) {
    $scope.campaignData = {};
    $scope.id = $stateParams.id;

    $scope.newLink = {};
    $scope.newLink.data = {};
    $scope.loader = true;
    $scope.loaderVehicle = true;
    $scope.loaderFeed = true;

    $scope.searchVehicle='';
    $scope.searchFeed='';

    $scope.selectedImage='';
    $scope.listCampaign = function () {
        apiService.campaignListById($scope.id).then(function (data) {
            $scope.loader = false;
            $scope.campaignList = data.data[0];
            // $scope.vehicleList = data.data[0].campaign[0].vehicleId;
            // $scope.attachedVehicles = data.data[0].campaign;
        })
    }
    $scope.listCampaign();

    apiService.vehicleList().then(function (data) {
        $scope.loader = false;
        $scope.vehicleListForLink = data.data;
    })
    apiService.vehicleListByCampaign('58e8da1a5d3c76287f011d10').then(function (data) {
        $scope.linkedVehicleList = data.data[0].campaign;
        console.log($scope.linkedVehicleList)
        $scope.loaderVehicle = false;
    })


    $scope.selectVehicle = function (id) {
        $scope.newLink.data.vehicleId = id;
        apiService.vehicleDetailById(id).then(function (data) {

            $scope.vehicleDriver = data.data[0].driverId[0].fullName;
            console.log("Vehicle Detail=============")
            console.log(data.data[0])
            $scope.newLink.data.user = data.data[0].driverId[0]._id;
        })
    }

    $scope.linkVehicle = function () {

        $scope.newLink.campaignId=$scope.id;
        $scope.newLink.data.assignDate = moment().format();

        apiService.linkVehicle($scope.newLink).then(function (data) {
            $scope.listCampaign();
            $scope.closePopup();

            $scope.newLink.data.vehicleId ='';
            $scope.newLink.data.user ='';
            $scope.vehicleDriver = '';

        })
    }

    $scope.closePopup = function () {
        setTimeout(function () {
            $('.popup.linkVehicle').fadeOut(100)
            $('.background').fadeOut(100)
        }, 100)
    }

    $scope.showImage = function (image, address) {
        $scope.selectedImage = image;
        $scope.feedAddress = address;
    }

    $scope.dateFormat = function (data) {
        return moment(data).format();
    }
    $scope.feedsPayload = {};
    $scope.feedsPayload.startDate = moment().format();
    $scope.feedsPayload.endDate = moment().format();
    $scope.getFeeds = function () {
        apiService.feeds($scope.feedsPayload).then(function (data) {
            console.log(data.data)
            $scope.feeds = data.data;
            $scope.loaderFeed = false;
        })

    }
    $scope.getFeeds()
});

