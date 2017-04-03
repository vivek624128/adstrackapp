/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('customerCtrl', function ($scope, $rootScope, $http, apiPath, $location, $state, $base64, $timeout) {

    $scope.uploadData = {};
    $scope.customerData = {};
    $scope.deleteData = {};
    $scope.Dimages = [];
    $scope.myImages = "";


    $scope.header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    $scope.msg = '';
    $scope.uploading = false;

    $scope.listCustomer = function () {
        $scope.customerData.function = 'select';
        $http.post(apiPath.baseUrl + 'customer.php', $scope.customerData, $scope.header).success(function (response) {
            $scope.customers = response;
        });
    }
    $scope.getCustomerById = function (id) {
        $scope.customerData.function = 'selectById';
        $scope.customerData.id = id;
        $http.post(apiPath.baseUrl + 'customer.php', $scope.customerData, $scope.header).success(function (response) {
            $scope.customerDetail = response[0];
        });
    }
    $scope.updateCustomer = function (id) {
        $scope.customerDetail.function = 'update';
        $scope.customerDetail.id = id;
        $http.post(apiPath.baseUrl + 'customer.php', $scope.customerDetail, $scope.header).success(function (response) {
            // console.log(response);
            $scope.listCustomer();
            $scope.msg = 'Record successfully Updated...';
            $timeout(function () {
                $('.popup').hide();
                $('.background').hide();
            },2000)
        });
    }
/*
    $scope.addCustomer = function () {
        $scope.uploadData.function = 'insert';
        $http.post(apiPath.baseUrl + 'customer.php', $scope.uploadData, $scope.header).success(function (response) {
            // console.log(response);
            $scope.listCustomer();
            $scope.msg = 'Record successfully Created..';
            $timeout(function () {
                $('.popup').hide();
                $('.background').hide();
            },2000)
        });
    }*/

    $scope.addCustomer = function () {
        $scope.dataExp = {};
        $scope.dataExp.id="122";
        $scope.dataExp.name="Vivek Kumar";
        $scope.dataExp.address="Patna";
        $scope.dataExp.phone="9308624128";
        $http.get(apiPath.baseUrl + 'test.php').success(function (response) {
            console.log(response)
        });
    }




    $scope.listCustomer();
});

