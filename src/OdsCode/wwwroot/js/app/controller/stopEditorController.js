// stopEditorController.js

(function () {
    "use strict";

    angular.module("app-trips")
    .controller("stopEditorController", stopEditorController);

    function stopEditorController($routeParams) {

        var vm = this;

        vm.tripName = $routeParams.tripName;
        vm.stops = [];
        vm.errorMessage = "";
        vm.isBusy = true;


    }

})();