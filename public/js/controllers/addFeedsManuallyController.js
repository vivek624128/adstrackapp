/**
 * Created by Vivek Kumar on 21/11/16.
 */


NEC.controller('addFeedsManuallyController', function ($scope, apiService, $http, $compile, $base64) {
    var map;
    var marker;
    $scope.uploadData = {};
    var initMap = function (lat, long) {
        map = L.map('dashboardMap', {zoomControl: false}).setView([lat, long], 14);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: ''
        }).addTo(map);
        map.attributionControl.setPrefix('');
        // map.doubleClickZoom.disable();
        // map.scrollWheelZoom.disable();
        // ...........................Set Zoom Control Position............................
        L.control.zoom({
            position: 'bottomright'
        }).addTo(map);

        // ..............................Add Search Location on Map...........................
        var GoogleSearch = L.Control.extend({
            options: {
                // topright, topleft, bottomleft, bottomright
                position: 'topleft'
            },
            onAdd: function () {
                var element = document.createElement("input");
                element.id = "searchBox";
                return element;
            }
        });
        (new GoogleSearch).addTo(map);
        document.getElementById("searchBox").placeholder = "Search Area";
        var input = document.getElementById("searchBox");
        var searchBox = new google.maps.places.SearchBox(input);
        searchBox.addListener('places_changed', function () {
            // map.removeLayer(marker);
            var places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            var group = L.featureGroup();
            places.forEach(function (place) {

                // Create a marker for each place.
                console.log(places);
                console.log(place.geometry.location.lat() + " / " + place.geometry.location.lng());
                var marker = L.marker([
                    place.geometry.location.lat(),
                    place.geometry.location.lng()
                ]);
//                group.addLayer(marker);

                map.setView([place.geometry.location.lat(), place.geometry.location.lng()]);

            });
            group.addTo(map);
            map.setZoom(14)
        });
    }
    initMap(13.0074636, 77.5653817)

    $scope.loader=false;
    $scope.statusData = {};
    $scope.statusData.campId = '58e8da1a5d3c76287f011d10';
    $scope.statusData.userId = '';
    // $scope.statusData.VehicleRegNo = '';
    $scope.statusData.updates = {};
    $scope.statusData.updates.updatedOn = moment().format();
    $scope.statusData.updates.location = {};
    $scope.statusData.updates.updateStatus='';
    $scope.myImages='';


    $scope.addSensor = function () {
        var html = '<ul class="form newArea">' +
                '<li><strong>Lat/Long : </strong> [{{statusData.updates.location.latitude}},{{statusData.updates.location.longitude}}]</li>' +
                '<li><strong>Address : </strong> {{statusData.updates.location.address}}<li>' +
                '</ul>',
            linkFunction = $compile(angular.element(html)),
            newScope = $scope.$new();
        marker = new L.marker(map.getCenter(), {
            draggable: true
        }).addTo(map).bindPopup(linkFunction(newScope)[0]).openPopup();
        $scope.position = map.getCenter();

        $scope.statusData.updates.location = $scope.getLocationDetail(map.getCenter());

        marker.on("dragend", function (e) {
            // var marker = e.target;
            var position = e.target.getLatLng();
            $scope.statusData.updates.location = $scope.getLocationDetail(position);
            marker.openPopup();
            map.setView(new L.LatLng( e.target.getLatLng().lat,e.target.getLatLng().lng),14);
        });
    }

    apiService.vehicleList().then(function (data) {
        $scope.vehicleListForLink = data.data;
    })

    $scope.getLocationDetail = function (position) {
        $scope.location = {};
        $scope.location.latitude = position.lat;
        $scope.location.longitude = position.lng;
        $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.lat + ',' + position.lng + '&sensor=true')
            .success(function (response) {
                $scope.location.address = response.results[0].formatted_address;

            })
        return $scope.location;
    }
    $scope.Dimages = [];
    $scope.myImages = "";

    $scope.data = {};
    $scope.header = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    $scope.$watch("myImages", function (newVal, oldVal) {
        if(newVal){
            $scope.data.imageData = "data:image/png;base64," + $scope.myImages.compressed.dataURL.split(',')[1];
            // $scope.data.imageData = "data:image/png;base64," + $scope.myImages.base64;
            $http.post('http://mahaboudhilocation.com/trackapp/saveImage.php', $scope.data, $scope.header).success(function (response) {

                $scope.uploadedImage = 'http://mahaboudhilocation.com/trackapp/'+response;
                $scope.photoUploaded = true;
                $scope.statusData.updates.updateStatus = 'http://mahaboudhilocation.com/trackapp/'+response;
                console.log($scope.statusData.updates.updateStatus)
                // apiService.hideLoader()
            });

        }
    });

    $scope.saveFeed = function () {
        if($scope.statusData.userId==''){
            $scope.errmsg = "Please Select Vehicle .............";
        }else if(!$scope.statusData.updates.location.address){
            $scope.errmsg = "Please Select Location .............";
        }else if($scope.statusData.updates.updateStatus==''){
            $scope.errmsg = "Please Add Photo .............";
        }
        else{
            $scope.loader = true;
            apiService.updateStatus($scope.statusData).then(function (data) {
                console.log(data);
                $scope.loader = false;
                // // apiService.hideLoader();
                // $state.go('app.confirmUpdate')

                $scope.msg = "Data Successfully Saved .............";
                $scope.statusData.userId = '';
                // $scope.statusData.VehicleRegNo = '';
                $scope.statusData.updates = {};
                $scope.statusData.updates.updatedOn = moment().format();
                $scope.statusData.updates.location = {};
                $scope.statusData.updates.updateStatus='';
                $scope.myImages='';
            })
        }

    }
});

