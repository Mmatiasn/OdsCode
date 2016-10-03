// tripsController.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-trips")
        .controller("tripsController", tripsController);

    function tripsController($http) {

        var vm = this;

        vm.trips = [];

        vm.newTrip = {};

        vm.errorMessage = "";

        vm.isBusy = true;

        $http.get("/api/trips")
            .then(function (response) {
                // Success
                angular.copy(response.data, vm.trips);
                toastr["info"]("Loaded " + vm.trips.length + " trip(s)");
            }, function (error) {
                // Failure
                vm.errorMessage = "Failed to load data: " + error;
                toastr["error"]("Failed To Load Trip(s).");
            })
            .finally(function () {
                vm.isBusy = false;
            });

        vm.addTrip = function () {
            vm.isBusy = true;
            vm.errorMessage = "";

            $http.post("/api/trips", vm.newTrip)
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
    }

})();