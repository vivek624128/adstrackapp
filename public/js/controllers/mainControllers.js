
NEC.controller("mainController", function ($scope,$location, $rootScope) {
    $scope.currentRout= function (path) {
        var loc=$location.path();
        return loc.includes(path)
    };

    $scope.closePopup= function (popup) {
        $("."+popup).fadeOut(250, function () {
            $(".background").fadeOut(250);
        });
    };

    $scope.xAxis= ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];

    $scope.yAxis=[{
        name: 'Tokyo',
        data: [10, 30, 40, 45, 35, 50, 68, 60, 38, 40, 51, 49, 40, 30, 26, 37, 19, 42, 29, 37, 30, 50, 42, 60]

    }]

    // $rootScope.baseUrl = 'http://quotientcamp-myflash.rhcloud.com';
    $rootScope.noti;
    $rootScope.baseUrl = 'http://localhost:8080';




})




