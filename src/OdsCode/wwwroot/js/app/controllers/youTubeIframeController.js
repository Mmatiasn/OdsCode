// youTubeIframeController.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-youtube")
        .controller("youTubeIframeController", youTubeIframeController);

    function youTubeIframeController($scope, YT_event) {

        $scope.YT_event = YT_event;
        $scope.playStatus = YT_event.PAUSE;
        $scope.iconStatus = true;

        //initial settings
        $scope.yt = {
            width: 500,
            height: 500,
            videoid: "M7lc1UVf-VE"
        };

        $scope.sendControlEvent = function (yt_event) {
            console.log(yt_event);
            this.$broadcast(yt_event);
        };

        $scope.playToggle = function() {
            $scope.playStatus = $scope.playStatus === YT_event.PLAY ? YT_event.PAUSE : YT_event.PLAY;
            $scope.iconStatus = $scope.iconStatus === true ? false : true;
            return $scope.playStatus;
        };

        $scope.$on(YT_event.STATUS_CHANGE, function (event, data) {
            $scope.yt.playerStatus = data;
        });
    }
})();