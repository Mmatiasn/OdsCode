// tripEditorController.js
(function () {
    "use strict";
    angular.module("app-trips")
    .controller("tripEditorController", tripEditorController);
    function tripEditorController($http, $routeParams) {
        var vm = this;
        vm.paramspName = $routeParams.tripName;
        vm.getName = "";
        vm.dateCreated = "";
        vm.stops = [];
        vm.newStop = {};
        vm.errorMessage = "";
        vm.isBusy = true;


        // GETS ALL STOPS FOR A TRIP
        $http.get(OdsRoot + "/api/trips/" + vm.paramspName)
        .then(function (response) {
            // Success
            vm.getName = response.data[0].name;
            vm.dateCreated = response.data[0].dateCreated;
            angular.copy(response.data[0].stops, vm.stops);
            _showMap(vm.stops);
            toastr["info"]("Loaded " + vm.getName);
        }, function (error) {
            // Failure
            vm.errorMessage = "Failed to load data: " + error;
            toastr["error"]("Failed To Load Trip Data");
        })
        .finally(function () {
            vm.isBusy = false;
        });


        // ADDS A STOP TO TRIP
        vm.addStop = function () {

            vm.isBusy = true;

            $http.post(OdsRoot + "/api/trips/" + vm.paramspName + "/stops", vm.newStop)
                .then(function (response) {
                    // Success
                    vm.stops.push(response.data);
                    toastr["success"](vm.newStop.name + " Saved");
                    _showMap(vm.stops);
                    vm.newStop = {};
                }, function (error) {
                    vm.errorMessage = "Failed to add new stop" + error;
                    toastr["error"]("Failed To Save Stop");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        };

        vm.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 26.714, lng: -80.053 },
            zoom: 6
        });

        vm.input = (document.getElementById('name'));

        vm.autocomplete = new google.maps.places.Autocomplete(vm.input);

        vm.autocomplete.bindTo('bounds', vm.map);

        vm.infowindow = new google.maps.InfoWindow();

        vm.marker = new google.maps.Marker({
            map:     vm.map,
            anchorPoint:    new google.maps.Point(0, -29)
        });

        vm.autocomplete.addListener('place_changed',
            function() {
                vm.infowindow.close();
                vm.marker.setVisible(false);
                var place = this.getPlace();
                if (!place.geometry) {
                    toastr["error"]("No Location Found");
                    return;
                }
                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    vm.map.fitBounds(place.geometry.viewport);
                } else {
                    vm.map.setCenter(place.geometry.location);
                    vm.map.setZoom(17);  // Why 17? Because it looks good.
                }
                vm.marker.setIcon(/** @type {google.maps.Icon} */({
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(35, 35)
                }));
                vm.marker.setPosition(place.geometry.location);
                vm.marker.setVisible(true);
                var address = '';
                if (place.address_components) {
                    address = [
                      (place.address_components[0] && place.address_components[0].short_name || ''),
                      (place.address_components[1] && place.address_components[1].short_name || ''),
                      (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }

                vm.infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                vm.infowindow.open(map, vm.marker);
            });

        // Manages GMAP
        function _showMap(stops) {

            if (stops && stops.length > 0) {

            }
            else {
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

            }

        }

    }
})();