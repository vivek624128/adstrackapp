/**
 * Created by Vivek Kumar on 21/11/16.
 */


NEC.controller('dashboardCtrl', function ($scope) {
    var map;
    var locations = [
        ['Kankarbag, Patna, Bihar -800020', 25.6038596, 85.1049313, 'http://www.destination360.com/australia-south-pacific/australia/images/s/australia-bondi-beach.jpg', 'Vivek Kumar'],
        ['Flashbox', 25.183516, 85.5124163, 'http://flashbox.in/Images/portfolio_Thumb/Invaria1.jpg', 'Vivek Kumar'],
        ['Flashbox', 25.4178353, 86.1075368, 'http://flashbox.in/Images/portfolio_Thumb/Invaria1.jpg', 'Vivek Kumar'],
        ['Flashbox', 26.1506267, 85.8681585, 'http://flashbox.in/Images/portfolio_Thumb/Invaria1.jpg', 'Vivek Kumar'],
        ['Flashbox', 26.5885131, 85.4910526, 'http://flashbox.in/Images/portfolio_Thumb/Invaria1.jpg', 'Vivek Kumar'],
        ['Flashbox', 26.5142822, 85.2900411, 'http://flashbox.in/Images/portfolio_Thumb/Invaria1.jpg', 'Vivek Kumar']
    ];
    function initialize() {
        // map = new google.maps.Map(document.getElementById('dashboardMap'), mapOptions);
        var map = new google.maps.Map(document.getElementById('dashboardMap'), {
            zoom:7,
            center: new google.maps.LatLng(25.6126998,85.0619425),
            mapTypeId: google.maps.MapTypeId.SATELITE,
        });

        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        for (i=0;i<locations.length;i++){
            var mark=locations[i];
            // $scope.addMarkers(marker[1], marker[2], marker[3], marker[4], marker[0]);
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(mark[1], mark[2]),
                icon:"http://programmervivek.co.in/mapIcon.png",
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    var content='<img src="'+mark[3]+'" style="width:300px;"><br><strong>Posted By: </strong> '+mark[4]+' <br><strong>Location : </strong> '+mark[0];
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }
    google.maps.event.addDomListener(window, 'load', initialize);




});

