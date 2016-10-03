﻿// tripEditorController.js
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

        // Manages GMAP
        function _showMap(stops) {
            if (stops && stops.length > 0) {

                var mapStops = _.map(stops,
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
                        userName: "Default",
                    }
                ];

                var mapStops = [
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