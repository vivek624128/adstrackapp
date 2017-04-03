/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('newTransactionCtrl', function ($scope, $rootScope, $http, $window, $location, $state, apiPath) {
    $scope.customerData = {};
    $scope.uploadData = {};
    $scope.uploadData.invoice_date = moment().format('YYYY-MM-DD');
    $scope.header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    $scope.listCustomer = function () {
        $scope.customerData.function = 'select';
        console.log($scope.customerData)
        $http.post(apiPath.baseUrl + 'customer.php', $scope.customerData, $scope.header).success(function (response) {
            $scope.customers = response;
            $scope.uploadData.cust_id = 'Select Customer'
        });
    }
    $scope.listCustomer();

    $scope.selectCustomer = function (selectedData, srl) {
        $scope.uploadData.cust_id = selectedData;
        $scope.getCustomerById(srl);
    }

    $scope.getCustomerById = function (id) {
        $scope.customerData.function = 'selectById';
        $scope.customerData.id = id;
        $http.post(apiPath.baseUrl + 'customer.php', $scope.customerData, $scope.header).success(function (response) {
            console.log(response[0])
            $scope.uploadData.cust_no = response[0].cust_no;
            $scope.uploadData.cust_address = response[0].cust_address;
        });
    }

    $scope.newTrans = function () {
        $scope.uploadData.function = 'newTransaction';
        $scope.uploadData.timest = moment().format("HH:mm:ss");
        $http.post(apiPath.baseUrl + 'transactions.php', $scope.uploadData, $scope.header).success(function (response) {
            console.log(response)
        });
    }
});

