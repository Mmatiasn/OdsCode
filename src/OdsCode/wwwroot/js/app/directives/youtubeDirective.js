// youtubeDirective.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-youtube")
        .directive("youtube", function (youTubeLoaderFactory, YT_event) {

            return {
                restrict: 'E',

                scope: {
                    height: '@',
                    width: '@',
                    videoid: '@'
                },

                template: '<div></div>',

                link: function (scope, element) {
                    var player;

                    youTubeLoaderFactory.whenLoaded()
                        .then(function () {
                            player = new YT.Player(element.children()[0],
                            {
                                playerVars: {
                                    autoplay: 0,
                                    html5: 1,
                                    theme: "light",
                                    modesbranding: 0,
                                    color: "white",
                                    iv_load_policy: 3,
                                    showinfo: 1,
                                    controls: 1
                                },

                                height: scope.height,
                                width: scope.width,
                                videoId: scope.videoid,

                                events: {
                                    onStateChange: function(event) {
                                        var message = {
                                            event: YT_event.STATUS_CHANGE,
                                            data: ""
                                        };

                                        switch (event.data) {
                                            case YT.PlayerState.PLAYING:
                                                message.data = "PLAYING";
                                                break;
                                            case YT.PlayerState.ENDED:
                                                message.data = "ENDED";
                                                break;
                                            case YT.PlayerState.UNSTARTED:
                                                message.data = "NOT PLAYING";
                                                break;
                                            case YT.PlayerState.PAUSED:
                                                message.data = "PAUSED";
                                                break;
                                        };

                                        scope.$apply(function () {
                                            scope.$emit(message.event, message.data);
                                        });
                                    }
                        }
                            });
                        });

                    // Video Watch
                    scope.$watch('videoid', function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }
                        player.cueVideoById(scope.videoid);
                        player.playVideo();
                    });

                    // Height + Width Watch
                    scope.$watch('height + width', function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }
                        player.setSize(scope.width, scope.height);
                    });

                    // Stops Video
                    scope.$on(YT_event.STOP, function () {
                        player.seekTo(0);
                        player.stopVideo();
                    });

                    // Plays Video
                    scope.$on(YT_event.PLAY, function () {
                        player.playVideo();
                    });

                    // Pause Video
                    scope.$on(YT_event.PAUSE, function () {
                        player.pauseVideo();
                    });

                }
            }
        });
})();