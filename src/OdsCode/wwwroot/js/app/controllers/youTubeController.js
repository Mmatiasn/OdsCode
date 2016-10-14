// tripsController.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-youtube")
        .controller("youTubeController", function ($scope, YT_event) {
            //initial settings

            $scope.searchText = '';

            $scope.hoverIn = function () {
                alert()
                $scope.animate = "animate-show";
            };

            $scope.hoverOut = function () {
                $scope.animate = "";
            };

            $scope.ft = {
                width: 600,
                height: 300,
                videoid: "mePu74AKLDc",
                playerStatus: 'NOT PLAYING',
            };

            $scope.YT_event = YT_event;

            $scope.sendControlEvent = function (ctrlEvent) {
                this.$broadcast(ctrlEvent);
            }

            $scope.$on(YT_event.STATUS_CHANGE, function (event, data) {
                $scope.ft.playerStatus = data;

                if (data == 'ENDED') {
                    //var currentIndex = $scope.playlist.indexOf($scope.ft.videoid.toString());
                    //var next = (currentIndex + 1) > $scope.playlist.length ? $scope.playlist[playlist.length - 1] : $scope.playlist[currentIndex + 1];
                    var i;
                    //alert(JSON.stringify($scope.playlist))

                    for (i = 0; i < $scope.playlist.length; i++) {
                        alert(JSON.stringify($scope.playlist[i].videoId)+'::'+i)
                        if ($scope.ft.videoid == $scope.playlist[i].videoId) {
                            if (i != $scope.playlist.length - 1) {
                                //alert(JSON.stringify($scope.playlist[i + 1].videoId))
                                $scope.ft.videoid = $scope.playlist[i + 1].videoId;
                                $scope.ft.playerStatus = 'PLAYING';

                                setTimeout(function () {

                                    $scope.sendControlEvent($scope.YT_event.PLAY)
                                }, 500);


                            }
                        }
                    }
                }
            });

            $scope.playVideo = function (videoIdClick) {
                $scope.ft.videoid = videoIdClick;
            }

            $scope.playAll = function () {
                setTimeout(function () {

                    $scope.sendControlEvent($scope.YT_event.PLAY)
                }, 500);
            };

            $scope.searchYouTube = function (searchText) {
                listYoutube.getYoutubeList(searchText).then(function successCallback(data) {
                    $scope.urls = data.items;
                })
            };

            //default load the youtube grid
            $scope.searchYouTube($scope.searchText);



            $scope.onKeyPress = function ($event) {
                if ($event.keyCode == 13) {
                    $scope.searchYouTube($scope.searchText);
                }
            };


            //Play list 
            $scope.playlist = [
                                { title: 'Drive Slow ft. Badshah', videoId: 'mePu74AKLDc' },
            ];

            //code to add update comments
            $scope.addPlayList = function (videoId, title) {
                $scope.playlist.push({ title: title, videoId: videoId });
            };

            $scope.removeSong = function (index) {
                $scope.playlist.splice(index, 1);
            };

})();