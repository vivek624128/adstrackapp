/**
 * Created by Vivek Kumar on 12/26/2016.
 */
NEC.controller('workspaceCtrl', function ($scope, $rootScope, $http, $window, $location, $state, $base64) {

    $scope.uploadData = {};
    $scope.galleryData = {};
    $scope.deleteData = {};
    $scope.Dimages = [];
    $scope.myImages = "";

    $scope.$watch("myImages", function () {

        for (i = 0; i < $scope.myImages.length; i++) {
            $scope.Dimages.push("data:image/jpeg;base64," + $scope.myImages[i].base64);
        }
    });

    $scope.header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    $scope.msg = '';
    $scope.uploading = false;
    $scope.uploadImages = function () {
        $scope.uploadData.imgTitle = $scope.uploadData.desc;
        $scope.uploadData.function = 'insert';
        $scope.uploadImages = [];
        var totImageAllowed = 240;
        var totImageUploaded = parseInt($scope.galleryImages.length);
        var selectedImage = parseInt($scope.imageList.length);
        if(selectedImage>8){
            $scope.msg="Add max 8 image at a time...";
        }
        else{


            for (var i = 0; i < $scope.imageList.length; i++) {
                $scope.uploadImages.push($scope.imageList[i].compressed.dataURL)
            }
            $scope.uploadData.image = $scope.uploadImages;
            var totCount = (totImageUploaded + selectedImage);
            if (totCount < totImageAllowed) {
                $scope.uploading = true;
                $http.post('http://stjosephsschoolmokama.com/gallery.php', $scope.uploadData, $scope.header).success(function (response) {
                    console.log(response);
                    $scope.loadGallery();
                    $scope.uploadData.desc = '';
                    $scope.Dimages = [];
                    $scope.imageList = "";
                    $scope.uploading = false;
                    // $state.go('admin.adminDeviceList');
                });
            }
            else {
                $scope.msg = "Max Image uploading limit 250 (Images). Limit Exceeds!... So to upload new one please remove previous images. "
                $scope.uploadData.desc = '';
                $scope.Dimages = [];
                $scope.imageList = "";
            }
        }





        console.log($scope.uploadImages)


    };

    $scope.loadGallery = function () {

        $scope.galleryData.function = 'select';
        $http.post('http://stjosephsschoolmokama.com/gallery.php', $scope.galleryData, $scope.header).success(function (response) {
            $scope.galleryImages = response;
            console.log(response)
            // $state.go('admin.adminDeviceList');
        });
    }
    $scope.deleteImage = function (imgId, filename) {

        $scope.deleteData.function = 'delete';
        $scope.deleteData.filename = filename;
        $scope.deleteData.imgId = imgId;
        $http.post('http://stjosephsschoolmokama.com/gallery.php', $scope.deleteData, $scope.header).success(function (response) {
            console.log(response)
            $scope.loadGallery();
            // $state.go('admin.adminDeviceList');
        });
    }

    $scope.loadGallery();
});

