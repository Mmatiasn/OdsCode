// playListEditorController.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-youtube")
        .controller("playListEditorController", playListEditorController);

    function playListEditorController($scope, $rootScope, $routeParams, $http, getObjectListFactory /* $http ← Is needed to get and post */) {

        $scope.YTCurrentSearchText = "";
        $scope.PlayListEditorInfo = {};
        $scope.messageClass = { info: "info", warning: "warning", success: "success", error: "error" }
        $scope.YTPageToken = "";
        $scope.YTSearchResults = [];
        $scope.YTPlayList = [];
        $scope.Settings = {
            Replay: false,
            Shuffle: $scope.Settings.Shuffle,
            Autoplay: $scope.Settings.Autoplay
        }
        $scope.YTShowMoreLoading = false;
        $scope.YTPlayListLoading = false;
        $scope.YTSearchActive = false;
        $scope.paramspName = $routeParams.playListId;


        $http.get(OdsRoot + "/api/playlists/" + $scope.paramspName)
            .then(function (response) {
                // Success
                angular.copy(response.data, $scope.PlayListEditorInfo);
                console.log($scope.PlayListEditorInfo);
                angular.copy(response.data.videos.ytPlayListInfo, $scope.YTPlayList);
            },
                function (error) {
                    // Failure
                    $scope.PlayListEditorInfo = { name: "Unavailable", dateCreated: "Unavailable" }
                    console.log(error);
                });

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

        $scope.playVideo = function (videoId) {

            $rootScope.$broadcast('YTPlayNewVideo', videoId);
        }

        $scope.onKeyPress = function ($event, yTSearchText) {
            if ($event.keyCode === 13) {
                $scope.getVideos(yTSearchText);
            }
        };

        $scope.getVideos = function (yTSearchText) {
            $scope.YTSearchActive = true;
            $scope.YTShowMoreLoading = true;
            getObjectListFactory.getYoutubeList(yTSearchText)
            .then(function (data) {
                console.log(data);
                // Set the results to an array
                angular.copy(data.searchResults, $scope.YTSearchResults);
                // Set the page token
                $scope.YTPageToken = data.pageToken;
                // Set the current search text
                $scope.YTCurrentSearchText = yTSearchText;
                // Loading should be done now
                $scope.YTShowMoreLoading = false;
            });
        }

        $scope.addVideoToPlayList = function (videoObject) {
            $scope.YTPlayListLoading = true;
            if (videoObject !== null) {
                $scope.YTPlayList.push(videoObject);
                $scope.YTPlayListSaveChange();
            } else {
                toastr["error"]("Unable To Add Video");
            }
            $scope.YTPlayListLoading = false;
        }

        $scope.onDropComplete = function (index, data, event) {
            // After a complete drop it will save changes
            // After dragging it will save local changes
            var droppedIndex = $scope.YTPlayList[index];
            var draggedIndex = $scope.YTPlayList.indexOf(data);
            $scope.YTPlayList[index] = data;
            $scope.YTPlayList[draggedIndex] = droppedIndex;
            $scope.YTPlayListSaveChange();
        }

        $scope.onDragComplete = function (index, data, event) {
        }

        $scope.removeVideoFromPlayList = function (videoPosition) {
            if (videoPosition !== null) {
                $scope.YTPlayList.splice(videoPosition, 1);
                $scope.YTPlayListSaveChange();
                toastr["error"]("Video Removed");
            } else {
                toastr["error"]("Unable To Remove Video");
            }
        }

        $scope.YtIdGetter = function () {
            return $scope.YTPlayList.map(function (a) { return a.id }).join(",");
        }

        $scope.YTPlayListSaveChange = function (messageClass, message) {

            $scope.YTPlayListLoading = true;

            var videoPlayList = {
                PlayListId: $scope.PlayListEditorInfo.id,
                YtVideoString: $scope.YtIdGetter(),
                Replay: $scope.Settings.Replay,
                Shuffle: $scope.Settings.Shuffle,
                Autoplay: $scope.Settings.Autoplay
            }

            $http.post(OdsRoot + "/api/videos/" + $scope.paramspName, videoPlayList)
           .then(function (response) {
               if (messageClass != null && message != null) {
                   toastr[messageClass](message);
               }
           }, function (error) {
               // Failure
               toastr["error"]("Error Processing Request");
               console.log(error);
           })
           .finally(function () {
               $scope.YTPlayListLoading = false;
           });

            //Save YTPlayList array loop and get a string id of the order
            console.log("Saving sh**!");
        }

        $scope.getMoreVideos = function () {
            $scope.YTShowMoreLoading = true;
            getObjectListFactory.getNextYouTubeList($scope.YTCurrentSearchText, $scope.YTPageToken)
                .then(function (data) {
                    console.log(data);
                    // Set the results to an array
                    $scope.YTSearchResults = $scope.YTSearchResults.concat(data.searchResults);
                    // Set the page token
                    $scope.YTPageToken = data.pageToken;
                    // Loading should be done now
                    $scope.YTShowMoreLoading = false;
                });
        }

        $scope.closeYTVideos = function () {
            $scope.YTSearchActive = false;
            $scope.YTSearchResults = [];
        }

        $scope.rating = function (starpercent, dislikes, likes) {
            var total = parseInt(dislikes) + parseInt(likes);
            var likepercent = Math.floor((likes / total) * 100);

            switch (starpercent) {
                case 10:
                    return starpercent <= likepercent && likepercent < 20;
                case 20:
                    return starpercent <= likepercent;
                case 30:
                    return starpercent <= likepercent && likepercent < 40;
                case 40:
                    return starpercent <= likepercent;
                case 50:;
                    return starpercent <= likepercent && likepercent < 60;
                case 60:
                    return starpercent <= likepercent;
                case 70:
                    return starpercent <= likepercent && likepercent < 80;
                case 80:
                    return starpercent <= likepercent;
                case 90:
                    return starpercent <= likepercent && likepercent < 100;
                case 100:
                    return starpercent <= likepercent;
                default:
                    return false;
            }
        }

    }
})();