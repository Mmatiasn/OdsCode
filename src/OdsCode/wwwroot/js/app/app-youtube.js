// app-trips.js
(function () {
    "use strict";

    // Creating the Module
    angular.module("app-youtube", ["ngRoute"])
        .config(function($routeProvider) {

            $routeProvider.when("/",
            {
                controller: "playListsController",
                controllerAs: "vm",
                templateUrl: OdsRoot + "/views/playListsViews/playListsView.html"
            });

            $routeProvider.when("/editor/:playListName",
            {
                controller: "playListEditorController",
                controllerAs: "vm",
                templateUrl: OdsRoot + "/views/playListsViews/playListEditorView.html"
            });

            $routeProvider.when("/editor/:playListName/videos",
            {
                controller: "videosController",
                controllerAs: "vm",
                templateUrl: OdsRoot + "/views/videosViews/videosView.html"
            });

            $routeProvider.when("/editor/:playListName/:video/editor",
            {
                controller: "videoEditorController",
                controllerAs: "vm",
                templateUrl: OdsRoot + "/views/videosViews/videoEditorView.html"
            });

            $routeProvider.otherwise({ redirectTo: "/" });
        })
        .filter('escape',
            function() {
                return window.encodeURIComponent;
            })
        .constant('YT_event',
        {
            STOP: 0,
            PLAY: 1,
            PAUSE: 2,
            STATUS_CHANGE: 3
        });
})();