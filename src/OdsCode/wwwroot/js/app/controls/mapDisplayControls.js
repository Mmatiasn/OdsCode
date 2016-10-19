// mapDisplayControls.js
(function () {
    "use strict";

    // Getting the existing module → no []?
    angular.module("app-trips")
        .controller("mapDisplayControls", mapDisplayControls);

    function mapDisplayControls($scope, $window /* $http ← Is needed to get and post */) {

        //$scope.custom = $scope.custom === false ? true : false;
        $scope.mapColSize = "col-md-12";

        $window.onscroll = function () {
            $scope.mapColSize = $(".map-sticky-position").css("position") === "fixed" ? "col-md-9 mapscrolling" : "col-md-12";
            $scope.$apply();
        };
    }
})();