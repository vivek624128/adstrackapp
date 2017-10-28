/**
 * Created by Flashbox on 1/20/2017.
 */
NEC.service('apiService', function ($http, apiPath) {
    return {
        authenticate : function (data) {
            return $http.post(apiPath.baseUrl+'login/authenticate', data)
        },
        selectUserType : function () {
            return $http.get(apiPath.baseUrl+'listUserType')
        },
        saveUser : function (data) {
            return $http.post(apiPath.baseUrl+'newUser', data)
        },
        editUser : function (data) {
            return $http.put(apiPath.baseUrl+'editUser', data)
        },
        userListFull : function () {
            return $http.jsonp(apiPath.baseUrl+'userList?callback=JSON_CALLBACK', {jsonpCallbackParam: 'callback'})
        },
        userList : function () {
            return $http.jsonp(apiPath.baseUrl+'userList/select?callback=JSON_CALLBACK', {jsonpCallbackParam: 'callback'})
        },
        deleteUser : function (id) {
            return $http.jsonp(apiPath.baseUrl+'removeUser/'+id+'?callback=JSON_CALLBACK', {jsonpCallbackParam: 'callback'})
        },
        newAdsCat : function (data) {
            return $http.post(apiPath.baseUrl+'newAdsCategory', data)
        },
        adsCategory : function () {
            return $http.get(apiPath.baseUrl+'listAdsCategory')
        },
        newUserType : function (data) {
            return $http.post(apiPath.baseUrl+'newUserType', data)
        },
        listUserType : function () {
            return $http.get(apiPath.baseUrl+'listUserType')
        },
        addVehicle : function (data) {
            return $http.post(apiPath.baseUrl+'newVehicles', data)
        },
        editVehicle : function (data) {
            return $http.post(apiPath.baseUrl+'editVehicle', data)
        },
        vehicleList : function () {
            return $http.jsonp(apiPath.baseUrl+'listVehicles?callback=JSON_CALLBACK', {jsonpCallbackParam: 'callback'})
        },
        vehicleDetailById : function (id) {
            return $http.jsonp(apiPath.baseUrl+'vehicleDetail/'+id+'?callback=JSON_CALLBACK', {jsonpCallbackParam: 'callback'})
        },
        vehicleNoById : function (id) {
            return $http.jsonp(apiPath.baseUrl+'vehicleNoById/'+id+'?callback=JSON_CALLBACK', {jsonpCallbackParam: 'callback'})
        },
        addProject : function (data) {
            return $http.post(apiPath.baseUrl+'newProject', data)
        },
        projectList : function () {
            return $http.jsonp(apiPath.baseUrl+'projectList?callback=JSON_CALLBACK', {jsonpCallbackParam: 'callback'})
        },
        newCampaign : function (data) {
            return $http.post(apiPath.baseUrl+'newCampaign', data)
        },
        campaignList : function () {
            return $http.jsonp(apiPath.baseUrl+'listCampaign?callback=JSON_CALLBACK', {jsonpCallbackParam: 'callback'})
        },
        campaignListById : function (id) {
            return $http.jsonp(apiPath.baseUrl+'listCampaignById/'+id+'?callback=JSON_CALLBACK', {jsonpCallbackParam: 'callback'})
        },
        vehicleListByCampaign : function (id) {
            return $http.jsonp(apiPath.baseUrl+'listVehicleByCampaignId/'+id+'?callback=JSON_CALLBACK', {jsonpCallbackParam: 'callback'})
        },
        linkVehicle : function (data) {
            return $http.post(apiPath.baseUrl+'linkVehicle', data)
        },
        feeds : function (data) {
            return $http.post(apiPath.baseUrl+'feeds', data)
        },
        feedsByVehicleId : function (data) {
            return $http.post(apiPath.baseUrl+'feedsByVehicleId', data)
        },
        addNewVehicleBill : function (data) {
            return $http.post(apiPath.baseUrl+'vehicleBill', data)
        },
        vehicleBillByID : function (id,date) {
            return $http.jsonp(apiPath.baseUrl+'vehicleBill/'+id+'/'+date+'?callback=JSON_CALLBACK', {jsonpCallbackParam: 'callback'})
        },
        updateStatus: function (data) {
            return $http.post(apiPath.baseUrl + 'addCampaignFeeds', data)
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
                // baseUrl: 'http://localhost:8080/'
                // baseUrl: 'https://pure-stream-91531.herokuapp.com/'
                // baseUrl: 'http://trackapp.mahaboudhilocation.com/'
                baseUrl: 'http://adstrackapp-trackapp.1d35.starter-us-east-1.openshiftapps.com/'
            }
        }
    }
});
NEC.config(function (apiPathProvider) {

});
