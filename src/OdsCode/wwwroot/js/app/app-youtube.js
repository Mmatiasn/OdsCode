// app-trips.js
(function () {
    "use strict";

    // Creating the Module
    angular.module("app-youtube", ['ngRoute', 'ngDraggable'])
        .config(function ($routeProvider) {

            $routeProvider.when("/",
            {
                controller: "playListsController",
                controllerAs: "vm",
                templateUrl: OdsRoot + "/views/playListsViews/playListsView.html"
            });

            $routeProvider.when("/editor/:playListId",
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
            function () {
                return window.encodeURIComponent;
            })
        .filter('default',
        [function() {
            return function (input, def) {
                return !!input ? input : def;
            };
        }])
        .constant('YT_event',
        {
            STOP: 0,
            PLAY: 1,
            PAUSE: 2,
            STATUS_CHANGE: 3
        })
        .filter('YTTimeFilter',
            function () {
                return function (ytTime) {
                    return ytTime.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "");
                }
            });
})();