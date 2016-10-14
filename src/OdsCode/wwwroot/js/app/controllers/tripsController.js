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

        vm.errorMessage = "";

        vm.isBusy = true;


        // Get Get Trips
        $http.get(OdsRoot + "/api/trips")
            .then(function (response) {
                // Success
                angular.copy(response.data, vm.trips);
                toastr["info"]("Loaded " + vm.trips.length + " trip(s)");
                _showMap();
            }, function (error) {
                // Failure
                vm.errorMessage = "Failed to load data: " + error;
                toastr["error"]("Failed To Load Trip(s).");
            })
            .finally(function () {
                vm.isBusy = false;
            });


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

        // Manages GMAP
        function _showMap(stops) {

            var mapStops;

            if (stops && stops.length > 0) {

                mapStops = _.map(stops,
                    function (item) {
                        return {
                            lat: item.latitude,
                            long: item.longitude,
                            info: item.name
                        };
                    });

                // Show Map
                travelMap.createMap({
                    stops: mapStops,
                    selector: "#map",
                    currentStop: 0,
                    initialZoom: 3
                });
            }
            else {
                vm.stops = [
                    {
                        arrival: "2016-10-04T00:00:00",
                        id: 1,
                        latitude: 33.748995,
                        longitude: -84.387982,
                        name: "West Palm Beach, Florida",
                        order: 0,
                        userName: "Default"
                    }
                ];

                mapStops = [
                    {
                        info: "West Palm Beach, Florida",
                        lat: 26.714389,
                        long: -80.053192
                    }
                ];

                // Show Map
                travelMap.createMap({
                    stops: mapStops,
                    selector: "#map",
                    currentStop: 0,
                    initialZoom: 6
                });

                vm.stops = [];
            }
        }
    }
})();