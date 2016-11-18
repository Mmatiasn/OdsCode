// youTubeSearchFactory.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-youtube")
        .factory("youTubeSearchFactory", youTubeSearchFactory);

    function youTubeSearchFactory($http, $q) {

        var youTubeSearchFactory = new Object();

        youTubeSearchFactory.getvideos = function(query) {
            var searchdata = $q.defer();

            $http({
                    method: 'GET',
                    url: OdsRoot + "/api/youtube/search",
                    params: { q: query }
                })
                .then(function successCallback(response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        searchdata.resolve(response);
                    },
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        searchdata.resolve(response);
                        toastr["error"]("Failed To Get Search Result(s).");
                    });
            return searchdata.promise;
        }

        return youTubeSearchFactory;
    }

})();