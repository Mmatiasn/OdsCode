// playListEditorController.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-youtube")
        .controller("playListEditorController", playListEditorController);

    function playListEditorController(/* $http ← Is needed to get and post */) {



        function get_yt_autocomplete(query) {
            var deferred = $q.defer();
            var jsonQuery = JSON.stringify(query);
            console.log(jsonQuery);
            // Get YouTube Autocomplete
            // Simple GET request example:
            $http({
                method: 'GET',
                url: OdsRoot + "/api/youtube/search",
                params: { q: query }
            })
                .then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    deferred.resolve(response.data);
                    $scope.errorMessage = "";
                },
                    function errorCallback(error) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        $scope.errorMessage = "Failed to find results: " + error;
                    })
                .finally(function () {
                    return deferred.promise;
                });
        }

        $scope.autocomplete_yt = {
            suggest: get_yt_autocomplete,
            on_error: console.log
        };

    }
})();