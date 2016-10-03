﻿// app-trips.js
(function () {
    "use strict";

    // Creating the Module
    angular.module("app-trips", ["simpleControls", "ngRoute"])
    .config(function ($routeProvider) {

        $routeProvider.when("/", {
            controller: "tripsController",
            controllerAs: "vm",
            templateUrl: "/views/tripsViews/tripsView.html"
        });

        $routeProvider.when("/editor/:tripName", {
            controller: "tripEditorController",
            controllerAs: "vm",
            templateUrl: "/views/tripsViews/tripEditorView.html"
        });

        $routeProvider.when("/editor/:tripName/stops", {
            controller: "stopsController",
            controllerAs: "vm",
            templateUrl: "/views/stopsViews/stopsView.html"
        });

        $routeProvider.when("/editor/:tripName/:stopId/editor", {
            controller: "stopEditorController",
            controllerAs: "vm",
            templateUrl: "/views/stopsViews/stopsEditorView.html"
        });

        $routeProvider.otherwise({ redirectTo: "/" });
    })
    .filter('escape', function () {
        return window.encodeURIComponent;
    });


})();