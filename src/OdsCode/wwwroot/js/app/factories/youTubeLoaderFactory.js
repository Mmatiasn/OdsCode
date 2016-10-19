// youTubeLoaderFactory.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-youtube")
        .factory("youTubeLoaderFactory", youTubeLoaderFactory);

    function youTubeLoaderFactory($q, $window) {

        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var delay = $q.defer();

        $window.onYouTubeIframeAPIReady = function () {
                delay.resolve();
        }

        return {
            whenLoaded: function () {
                return delay.promise;
            }
        };

    }
})();