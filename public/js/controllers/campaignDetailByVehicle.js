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
    $scope.print = false;
    $scope.selectedImage = '';

    $scope.billData = {};
    $scope.billData.bills = {};
    $scope.billData.bills.eventLocations = [];
    $scope.billData.bills.enclosedDoc = [];
    $scope.eventLocations = '';
    $scope.documentAttached = '';
    $scope.selectedBillDetail={};
    $scope.permission = localStorage.getItem('permission');

    apiService.vehicleList().then(function (data) {
        $scope.loader = false;
        $scope.vehicleListForLink = data.data;
    })


    $scope.selectVehicle = function (id) {
        $scope.newLink.data.vehicleId = id;
        $scope.id=id;
        apiService.vehicleDetailById(id).then(function (data) {
            $scope.vehicleDetail = data.data[0];
            $scope.billData.vehicleId = $scope.vehicleDetail._id;
            $scope.vehicleNo = data.data[0].vehicleNo;
        })
    }
    $scope.selectVehicle($scope.id);



    $scope.showImage = function (image, address) {
        $scope.selectedImage = image;
        $scope.feedAddress = address;
    }

    $scope.dateFormat = function (data) {
        return moment(data).format();
    }
    $scope.feedsPayload = {};

    $scope.date = moment().format('YYYY-MM-DD');

    $scope.getFeeds = function () {

        $scope.feedsPayload.startDate = $scope.date;
        $scope.feedsPayload.endDate = $scope.date;
        $scope.feedsPayload.vehicleId = $scope.id;
        $scope.feeds = '';
        $scope.loaderFeed = true;
        $scope.locations = [];
        apiService.feedsByVehicleId($scope.feedsPayload).then(function (data) {
            $scope.feeds = [];
            _.forEach(data.data,function (value) {
                value._id.updateOn = moment(value._id.updateOn).format('YYYY-MM-DD HH:mm');
                $scope.feeds.push(value);
            })


            $scope.feeds = _.groupBy(data.data, '_id.updateOn');
            console.log(data.data)
            console.log($scope.feeds)
            $scope.loaderFeed = false;
           /* for (var i = 0; i < $scope.feeds.length; i++) {
                $scope.locations.push(new L.LatLng($scope.feeds[i]._id.locationData.latitude, $scope.feeds[i]._id.locationData.longitude));
            }*/
        })

    }
    $scope.getFeeds()

    $scope.$watch(
        "date",
        function handleFooChange(newValue, oldValue) {
            $scope.feedsPayload.endDate = newValue;
            $scope.feedsPayload.startDate = newValue;
            $scope.selectedBillDetail={};
            $scope.getFeeds();
            $scope.viewBill();
        }
    );

    $scope.$watch(
        "id",
        function handleFooChange(newValue, oldValue) {
            console.log(newValue)
            $scope.feedsPayload.endDate = $scope.date;
            $scope.feedsPayload.startDate = $scope.date;
            $scope.selectedBillDetail={};
            $scope.selectVehicle($scope.id);
            $scope.getFeeds();
            $scope.viewBill();
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


    $scope.printDiv = function (divName) {
        $scope.print = true;
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=1280,height=800');
        popupWin.document.open();
        popupWin.document.write('<html><head><link href="css/uiStyle.css" rel="stylesheet"><link href="css/preStyles.css" rel="stylesheet"><link href="css/fonts.css" rel="stylesheet"></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    }

    $scope.addEventLocation = function () {
        if ($scope.eventLocations != '') {
            var loc = {
                "location": $scope.eventLocations
            }
            $scope.billData.bills.eventLocations.push(loc);
            $scope.eventLocations = '';
        }
    }
    $scope.addDocument = function () {
        if ($scope.documentAttached != '') {
            var loc = {
                "docDetail": $scope.documentAttached
            }
            $scope.billData.bills.enclosedDoc.push(loc);
            $scope.documentAttached = '';
        }
    }

    $scope.cancelAction = function () {
        $scope.billData.bills = {};
        $scope.vehicleNo = $scope.vehicleDetail.vehicleNo;
        $scope.billData.bills.eventLocations = [];
        $scope.billData.bills.enclosedDoc = [];
        $scope.eventLocations = '';
        $scope.documentAttached = '';
    }

    $scope.saveBill = function () {
        $scope.billData.bills.billDate = moment().utc().format();
        console.log($scope.billData);
        apiService.addNewVehicleBill($scope.billData).then(function (data) {
            $scope.closePopup('.popup.bill');
            $scope.viewBill();
            $scope.printDiv('printBill');
        })
    }

    $scope.viewBill = function () {
        apiService.vehicleBillByID($scope.id,$scope.date).then(function (data) {
            console.log(data.data)
            if(data.data.length>0){
                $scope.selectedBillDetail = data.data[0]._id;
            }

        })
    }
    $scope.viewBill();

    $scope.closePopup = function (div) {
        setTimeout(function () {
            $(div).fadeOut(100)
            $('.background').fadeOut(100)
        }, 100)
    }

});

