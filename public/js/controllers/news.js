/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('newsCtrl', function ($scope, $rootScope, $http, $window, $location, $state, $base64) {

    $scope.uploadData = {};
    $scope.removeData = {};
    $scope.notices = {};

    $scope.header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    $scope.saveNotice = function () {
        $scope.uploadData.subject=$scope.uploadData.subject;
        $scope.uploadData.description=$scope.uploadData.description;
        $scope.uploadData.function='insert';

        $http.post('http://stjosephsschoolmokama.com/notice.php',$scope.uploadData,$scope.header).success(function (response) {
            console.log(response);
            $scope.loadNews();
            $scope.uploadData.subject='';
            $scope.uploadData.description='';
            // $state.go('admin.adminDeviceList');
        });


    };

    $scope.loadNews = function () {

        $scope.notices.function='select';
        $http.post('http://stjosephsschoolmokama.com/notice.php',$scope.notices,$scope.header).success(function (response) {
            $scope.noticeList = response;
            console.log(response)
            // $state.go('admin.adminDeviceList');
        });
    }

    $scope.removeNews = function (noticeid) {

        $scope.removeData.function='delete';
        $scope.removeData.noticeId=noticeid;
        $http.post('http://stjosephsschoolmokama.com/notice.php',$scope.removeData,$scope.header).success(function (response) {
            // $scope.noticeList = response;
            console.log(response);
            $scope.loadNews();
            // $state.go('admin.adminDeviceList');
        });
    }

    $scope.loadNews();
});

