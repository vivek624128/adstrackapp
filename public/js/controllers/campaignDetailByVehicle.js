/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('campaignDetailByVehicleCtrl', function ($scope, $rootScope, $http, $window, $location, $stateParams, apiService, $timeout) {
    $scope.campaignData = {};
    $scope.id = $stateParams.id;

    $scope.newLink = {};
    $scope.newLink.data = {};
    $scope.loader = true;
    $scope.loaderVehicle = true;

    $scope.searchVehicle = '';
    $scope.searchFeed = '';
    $scope.print=false;
    $scope.selectedImage = '';


    apiService.vehicleList().then(function (data) {
        $scope.loader = false;
        $scope.vehicleListForLink = data.data;
    })


    $scope.selectVehicle = function (id) {
        $scope.newLink.data.vehicleId = id;
        apiService.vehicleDetailById(id).then(function (data) {
            $scope.vehicleDetail = data.data[0];
            console.log($scope.vehicleDetail)
        })
    }
    $scope.selectVehicle($scope.id);


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
    $scope.date = moment().format('YYYY-MM-DD')

    $scope.feedsPayload.startDate = $scope.date;
    ;
    $scope.feedsPayload.endDate = $scope.date;
    $scope.feedsPayload.vehicleId = $scope.id;
    $scope.getFeeds = function () {
        $scope.feeds ='';
        $scope.loaderFeed = true;
        apiService.feedsByVehicleId($scope.feedsPayload).then(function (data) {
            $scope.feeds = data.data;
            $scope.loaderFeed = false;
            console.log($scope.feeds)

        })

    }
    $scope.getFeeds()

    $scope.$watch(
        "date",
        function handleFooChange(newValue, oldValue) {
            $scope.feedsPayload.endDate = newValue;
            $scope.feedsPayload.startDate = newValue;
            console.log($scope.feedsPayload.endDate)
            $scope.getFeeds()
        }
    );


    $scope.fetchVehicleNo = function (id) {
        var vehicles = $scope.linkedVehicleList;
        for (var i = 0; i < vehicles.length; i++) {
            if (id == vehicles[i].vehicleId[0]._id) {
                return vehicles[i].vehicleId[0].vehicleNo;
            }
        }
    }

    $scope.deleteFeeds = function () {
        $scope.deleted = true;
    }


    $scope.printDiv = function(divName) {
        $scope.print=true;
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open();
        popupWin.document.write('<html><head><link href="css/uiStyle.css" rel="stylesheet"><link href="css/preStyles.css" rel="stylesheet"><link href="css/fonts.css" rel="stylesheet"></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    }
});

