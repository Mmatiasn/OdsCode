// tripsController.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-trips")
        .controller("tripsController", tripsController);

    function tripsController($http) {

        var vm = this;

        vm.trips = [];

        vm.stops = [];

        vm.newTrip = {};

        vm.modalData;

        vm.errorMessage = "";

        vm.isBusy = true;

        vm.getTrips = function () {
            // Get Get Trips
            $http.get(OdsRoot + "/api/trips")
                .then(function (response) {
                    // Success
                    angular.copy(response.data, vm.trips);
                    _showMap();
                }, function (error) {
                    // Failure
                    vm.errorMessage = "Failed to load data: " + error;
                    toastr["error"]("Failed To Load Trip(s).");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        };

        vm.getTrips();

        // Post Add Trip
        vm.addTrip = function () {
            vm.isBusy = true;
            vm.errorMessage = "";

            $http.post(OdsRoot + "/api/trips", vm.newTrip)
           .then(function (response) {
               // Success
               vm.trips.push(response.data);
               toastr["success"](vm.newTrip.name + " Saved");
               vm.newTrip = {};
           }, function (error) {
               // Failure
               vm.errorMessage = "Failed to save new trip: " + error;
               toastr["error"]("Failed To Save Trip");
           })
           .finally(function () {
               vm.isBusy = false;
           });

        };

        // Delete Remove Trip
        vm.deleteTrip = function (tripId, tripName) {
            vm.isBusy = true;
            vm.errorMessage = "";
            console.log(tripId);

            $http.delete(OdsRoot + "/api/trips/" + tripId)
           .then(function (response) {
               // Success
               $('.odsModal').modal('hide');
               toastr["success"](tripName + " Deleted");
               vm.getTrips();
           }, function (error) {
               // Failure
               vm.errorMessage = "Failed to delete the" + tripName + ": " + error;
               toastr["error"]("Failed To Delete Trip");
           })
           .finally(function () {
               vm.isBusy = false;
           });

        };

        vm.modal = function (tripId, tripName) {

            console.log(tripId + " " + tripName);

            $('.odsModal').modal('show');

            vm.modalData =
                {
                    id: tripId,
                    name: tripName
                };

        };

        $('.odsModal')
            .on('hidden.bs.modal',
                function (e) {
                    vm.modalData = null;
                    console.log(e);
                    console.log(vm.modalData);
                });

        // Manages GMAP
        function _showMap(stops) {


            if (stops && stops.length > 0) {
                toastr["error"]("Failed To Load Map");
            }
            else {

                var map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: 26.714, lng: -80.053 },
                    zoom: 6
                });

                $(document).ready(function () {
                    google.maps.event.addListener(map, "idle", function () {
                        google.maps.event.trigger(map, 'resize');
                    });
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

            }

            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(browserHasGeolocation ?
                                      'Error: The Geolocation service failed.' :
                                      'Error: Your browser doesn\'t support geolocation.');
            }

        }
    }
})();