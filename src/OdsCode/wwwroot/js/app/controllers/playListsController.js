// playListsController.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-youtube")
        .controller("playListsController", playListsController);

    function playListsController($scope, $http, $q) {

        $scope.dirty = {};

        $scope.playlists = [];

        $scope.videos = [];

        $scope.newPlayList = {};

        $scope.modalData;

        $scope.errorMessage = "";

        $scope.isBusy = true;

        $scope.getPlayList = function () {
            // Get Get Trips
            $http.get(OdsRoot + "/api/playlists")
                .then(function (response) {
                    // Success
                    console.log(response);
                    angular.copy(response.data, $scope.playlists);
                    // Remember you can do something here too..._showMap();
                }, function (error) {
                    // Failure
                    $scope.errorMessage = "Failed to load data: " + error;
                    toastr["error"]("Failed To Load Play-List(s).");
                })
                .finally(function () {
                    $scope.isBusy = false;
                });
        };

        $scope.getPlayList();

        // Post Add Trip
        $scope.addPlayList = function () {
            $scope.isBusy = true;
            $scope.errorMessage = "";

            $http.post(OdsRoot + "/api/playlists", $scope.newPlayList)
           .then(function (response) {
               // Success
               $scope.playlists.push(response.data);
               toastr["success"]($scope.newPlayList.name + " Saved");
               $scope.newPlayList = {};
           }, function (error) {
               // Failure
               $scope.errorMessage = "Failed to save new play-list: " + error;
               toastr["error"]("Failed To Save Play-List");
           })
           .finally(function () {
               $scope.isBusy = false;
           });

        };

        // Delete Remove Trip
        $scope.deleteTrip = function (playListId, playListName) {
            $scope.isBusy = true;
            $scope.errorMessage = "";

            $http.delete(OdsRoot + "/api/playlist/" + playListId)
           .then(function () {
               // Success
               $('.odsModal').modal('hide');
               toastr["success"](playListName + " Deleted");
               $scope.getTrips();
           }, function (error) {
               // Failure
               $scope.errorMessage = "Failed to delete " + playListName + ": " + error;
               toastr["error"]("Failed To Delete Play-List");
           })
           .finally(function () {
               $scope.isBusy = false;
           });

        };

        $scope.modal = function (playListId, playListName) {

            $('.odsModal').modal('show');

            $scope.modalData =
                {
                    id: playListId,
                    name: playListName
                };

        };

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

            //$http.get(OdsRoot + "/api/youtube/search", jsonQuery)
            //    .then(function (response) {
            //        // Success
            //        deferred.resolve(response.data);
            //        $scope.errorMessage = "";
            //    }, function (error) {
            //        // Failure
            //        $scope.errorMessage = "Failed to find results: " + error;
            //    })
            //    .finally(function () {
            //        return deferred.promise;
            //    });
        }

        $scope.autocomplete_yt = {
            suggest: get_yt_autocomplete,
            on_error: console.log
        };

        $('.odsModal')
            .on('hidden.bs.modal',
                function (e) {
                    $scope.modalData = null;
                });

    }
})();