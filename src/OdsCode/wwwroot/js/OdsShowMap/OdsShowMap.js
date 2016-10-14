// Manages GMAP
(function () {
    $("#map")
        .ready(function () {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 6
            });
            

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var infoWindow = new google.maps.InfoWindow({ map: map });
                    infoWindow.setOptions(
                    {
                        content: '<h3><span class="tag blue"><i class="fa fa-map-marker" aria-hidden="true"></i></span> My Location </h3>'
                    });
                    infoWindow.setPosition(pos);
                    map.setCenter(pos);
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }


            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(browserHasGeolocation ?
                                      'Error: The Geolocation service failed.' :
                                      'Error: Your browser doesn\'t support geolocation.');
            }
        });
})();