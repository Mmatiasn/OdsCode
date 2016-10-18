// app-trips.js
(function () {
    "use strict";

    // Creating the Module
    angular.module("app-trips", ["simpleControls", "ngRoute"])
    .config(function ($routeProvider) {

        $routeProvider.when("/", {
            controller: "tripsController",
            controllerAs: "vm",
            templateUrl: OdsRoot + "/views/tripsViews/tripsView.html"
        });

        $routeProvider.when("/editor/:tripId", {
            controller: "tripEditorController",
            controllerAs: "vm",
            templateUrl: OdsRoot + "/views/tripsViews/tripEditorView.html"
        });

        $routeProvider.when("/editor/:tripId/stops", {
            controller: "stopsController",
            controllerAs: "vm",
            templateUrl: OdsRoot + "/views/stopsViews/stopsView.html"
        });

        $routeProvider.when("/editor/:tripId/stops/:stopId", {
            controller: "stopEditorController",
            controllerAs: "vm",
            templateUrl: OdsRoot + "/views/stopsViews/stopEditorView.html"
        });

        $routeProvider.otherwise({ redirectTo: "/" });
    })
    .filter('escape', function () {
        return window.encodeURIComponent;
    });
})();