/**
 * Created by Vivek Kumar on 21/11/16.
 */


NEC.controller('dashboardCtrl', function ($scope) {
    var map;
    var locations = [
        ['Kankarbag, Patna, Bihar -800020', 25.6038596, 85.1049313,'https://organicthemes.com/demo/profile/files/2012/12/profile_img.png', 'http://www.destination360.com/australia-south-pacific/australia/images/s/australia-bondi-beach.jpg', 'Vivek Kumar'],
        ['Flashbox', 25.183516, 85.5124163, 'http://wallpaper-gallery.net/images/profile-pics/profile-pics-18.jpg', 'http://flashbox.in/Images/portfolio_Thumb/Invaria1.jpg', 'Vivek Kumar'],
        ['Flashbox', 25.4178353, 86.1075368, 'http://www.threepullpa.com/data/uploads/53/466487-profile-pictures-cute-girl.jpg', 'http://flashbox.in/Images/portfolio_Thumb/Invaria1.jpg', 'Vivek Kumar'],
        ['Flashbox', 26.1506267, 85.8681585, 'http://i.dailymail.co.uk/i/pix/2016/05/23/22/348B850600000578-3605456-image-m-32_1464040491071.jpg', 'http://flashbox.in/Images/portfolio_Thumb/Invaria1.jpg', 'Vivek Kumar'],
        ['Flashbox', 26.5885131, 85.4910526, 'http://www.celebbra.com/wp-content/uploads/2016/01/Nayantara-Height-Weight-Bra-Pics-Profile.jpg', 'http://flashbox.in/Images/portfolio_Thumb/Invaria1.jpg', 'Vivek Kumar'],
        ['Flashbox', 26.5142822, 85.2900411, 'https://organicthemes.com/demo/profile/files/2012/12/profile_img.png', 'http://flashbox.in/Images/portfolio_Thumb/Invaria1.jpg', 'Vivek Kumar']
    ];
    function initialize() {
        // map = new google.maps.Map(document.getElementById('dashboardMap'), mapOptions);
        var map = new google.maps.Map(document.getElementById('dashboardMap'), {
            zoom:7,
            center: new google.maps.LatLng(25.6126998,85.0619425),
            mapTypeId: google.maps.MapTypeId.SATELITE
            /*,
            styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]*/
        });

        var infowindow = new google.maps.InfoWindow();
        var marker, i;

        for (i=0;i<locations.length;i++){
            var mark=locations[i];
            var icon = {
                url:mark[3] , // url
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };
            // $scope.addMarkers(marker[1], marker[2], marker[3], marker[4], marker[0]);
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(mark[1], mark[2]),
                icon:icon,
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    var content='<img src="'+mark[4]+'" style="width:300px;"><br><strong>Posted By: </strong> '+mark[5]+' <br><strong>Location : </strong> '+mark[0];
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }
    google.maps.event.addDomListener(window, 'load', initialize);




});

