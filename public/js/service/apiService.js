/**
 * Created by Flashbox on 1/20/2017.
 */
NEC.service('apiService', function ($http, apiPath) {
    return {
        selectUserType : function () {
            return $http.get(apiPath.baseUrl+'selectUserType')
        },
        saveUser : function (data) {
            return $http.post(apiPath.baseUrl+'newUser', data)
        },
        userList : function () {
            return $http.get(apiPath.baseUrl+'userList')
        },
        newAdsCat : function (data) {
            return $http.post(apiPath.baseUrl+'newAdsCategory', data)
        },
        adsCategory : function () {
            return $http.get(apiPath.baseUrl+'listAdsCategory')
        },
        addVehicle : function (data) {
            return $http.post(apiPath.baseUrl+'newVehicles')
        },
        vehicleList : function () {
            return $http.get(apiPath.baseUrl+'listVehicles')
        },
        addProject : function (data) {
            return $http.post(apiPath.baseUrl+'newProject')
        },
        projectList : function () {
            return $http.get(apiPath.baseUrl+'projectList')
        }
    }
})
NEC.service('locationService', function ($http, apiPath, $geolocation) {
    var location={};
    return {
        getLocation : function ($scope) {
            // $scope.location={};
            $geolocation.getCurrentPosition({
                timeout: 60000
            }).then(function(position) {
                location.lat= position.coords.latitude;
                location.long= position.coords.longitude;
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+location.lat+','+location.long+'&sensor=true')
                .success(function (response) {
                    location.address=response.results[0].formatted_address;
                })
            });
            return location;
        }
    }
})
NEC.provider('apiPath', function () {

    return {
        $get: function () {
            return {
                baseUrl: 'http://localhost:8080/'

               // baseUrl: 'http://newsapp-myflash.rhcloud.com/'
            }
        }
    }
});
NEC.config(function (apiPathProvider) {

});
