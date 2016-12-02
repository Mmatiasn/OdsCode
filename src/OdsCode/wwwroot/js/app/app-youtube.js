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
        [
            function () {
                return function (input, def) {
                    return !!input ? input : def;
                };
            }
        ])
        .constant('YT_event',
        {
            STOP: 0,
            PLAY: 1,
            PAUSE: 2,
            STATUS_CHANGE: 3
        })
        .run(function ($rootScope) {
            $rootScope.youTubeIframe = {
                videoPlayList: {
                    videos: [],
                    previousVideo: [],
                    currentVideo: {},
                    nextVideo: {}
                },

                videoSearch: {
                    videos: [],
                    previousVideo: [],
                    currentVideo: {},
                    nextVideo: {}
                },

                playStatus: null,

                focus: {
                    search: false,
                    playlist: false
                },
                settings: {
                    repeat: false,
                    shuffle: false,
                    autoplay: false,
                    restart: true,
                    time: {
                        min: null,
                        max: null,
                        userMin: null,
                        userMax: null
                    }
                }
            }
        })
        .false('YTToRegTime',
            function ($filter) {
                return function (ytSeconds) {
                    var ytRegTime = function (ytSeconds) {
                        if (ytSeconds < 3600) {
                            return $filter('date')(new Date(0, 0, 0, 0, 0, 0, 0).setSeconds(ytSeconds), 'mm:ss');
                        } if (ytSeconds < 86400) {
                            return $filter('date')(new Date(0, 0, 0, 0, 0, 0, 0).setSeconds(ytSeconds), 'HH:mm:ss');
                        } else {
                            return $filter('date')(new Date(0, 0, 0, 0, 0, 0, 0).setSeconds(ytSeconds), 'dd:HH:mm:ss');
                        }
                    }
                    return ytRegTime(ytSeconds);
                }
            })
        .filter('YTToSeconds',
            function () {
                return function (ytTime) {

                    var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
                    var hours = 0, minutes = 0, seconds = 0, ytSeconds = 0;

                    if (reptms.test(ytTime)) {
                        var matches = reptms.exec(ytTime);
                        if (matches[1]) hours = Number(matches[1]);
                        if (matches[2]) minutes = Number(matches[2]);
                        if (matches[3]) seconds = Number(matches[3]);
                        ytSeconds = hours * 3600 + minutes * 60 + seconds;
                    }
                    return ytSeconds;
                }
            });
})();