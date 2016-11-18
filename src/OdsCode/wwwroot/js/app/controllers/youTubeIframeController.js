// youTubeIframeController.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-youtube")
        .controller("youTubeIframeController", youTubeIframeController);

    function youTubeIframeController($scope, $window, YT_event) {

        $scope.YT_event = YT_event;
        $scope.playStatus = YT_event.PAUSE;
        $scope.iconStatus = true;
        $scope.ytColSize = "col-md-12";

        //Helps adjust video screen size
        $window.onscroll = function () {
            $scope.ytColSize = $(".yt-sticky-position").css("position") === "fixed" ? "col-md-7" : "col-md-12";
            $scope.$apply();
        };

        //initial settings
        $scope.yt = {
            width: 500,
            height: 500,
            videoid: "jzMhcP7ab3k"
        };

        $scope.sendControlEvent = function (yt_event) {
            this.$broadcast(yt_event);
        };

        $scope.playToggle = function() {
            $scope.playStatus = $scope.playStatus === YT_event.PLAY ? YT_event.PAUSE : YT_event.PLAY;
            $scope.iconStatus = $scope.iconStatus === true ? false : true;
            return $scope.playStatus;
        };

        $scope.$on('YTPlayNewVideo', function (event, videoId) {
            if ($scope.yt.videoid !== videoId) {
                $scope.yt.videoid = videoId;
                $scope.playStatus = YT_event.PAUSE;
                $scope.iconStatus = false;
            }
        });

        $scope.$on(YT_event.STATUS_CHANGE, function (event, data) {
            $scope.yt.playerStatus = data;
        });
    }
})();