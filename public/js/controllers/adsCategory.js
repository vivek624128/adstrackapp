/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('adsCategoryCtrl', function ($scope, $rootScope, $http, apiService) {
    $scope.uploadData = {};
    $scope.addNewAds = function () {
        apiService.newAdsCat($scope.uploadData).then(function (data) {
            console.log(data.data);
            $scope.listAdsCategory();
        })
    }

    $scope.listAdsCategory = function () {
        apiService.adsCategory().then(function (data) {
            $scope.adsCategoryList = data.data;
        })
    }
    $scope.listAdsCategory();
});

