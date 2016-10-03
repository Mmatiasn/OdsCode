// stopsController.js

(function () {
    "use strict";

    angular.module("app-trips")
    .controller("stopsController", stopsController);

    function stopsController($http, $routeParams) {

        var vm = this;

        vm.paramspName = $routeParams.tripName;

        vm.getTripName = "";
        vm.getTripDate = "";

        vm.stops = [];

        vm.newStop = {};

        vm.errorMessage = "";

        vm.isBusy = true;

        $http.get(OdsRoot + "/api/trips/" + vm.paramspName)
        .then(function (response) {
            // Success
            vm.getTripName = response.data[0].name;
            vm.getTripDate = response.data[0].dateCreated;
            angular.copy(response.data[0].stops, vm.stops);
            toastr["info"]("Loaded " + vm.stops.length + " Stop(s)");
        }, function (error) {
            // Failure
            vm.errorMessage = "Failed to load data: " + error;
            toastr["error"]("Failed To Load Stop(s).");
        })
        .finally(function () {
            vm.isBusy = false;
            $('#date-picker-trip').pickadate({
                format: 'mmmm, dd yyyy',
                formatSubmit: 'm/dd/yyyy'
            });
        });

        vm.addStop = function () {
            vm.isBusy = true;
            vm.errorMessage = "";

            $http.post(OdsRoot + "/api/trips/" + vm.paramspName + "/stops", vm.newStop)
           .then(function (response) {
               // Success
               vm.stops.push(response.data);
               toastr["success"](vm.newStop.name + " Saved");
               vm.newStop = {};
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