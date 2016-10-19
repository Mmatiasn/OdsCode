// tripEditorController.js
(function () {
    "use strict";

    angular.module("app-trips")
    .controller("tripEditorController", tripEditorController);
    function tripEditorController($scope, $http, $routeParams, $filter) {

        $scope.paramspName = $routeParams.tripId;
        $scope.getId = "";
        $scope.getName = "";
        $scope.stopDate = "";
        $scope.stops = [];
        $scope.newStop = {};
        $scope.modalData;
        $scope.errorMessage = "";
        $scope.isBusy = true;
        $scope.directionsService;
        $scope.directionsDisplay;


        // GETS ALL STOPS FOR A TRIP
        $scope.getStops = function () {
            $http.get(OdsRoot + "/api/trips/" + $scope.paramspName)
            .then(function (response) {
                // Success
                $scope.getId = response.data.id;
                $scope.getName = response.data.name;
                $scope.dateCreated = response.data.dateCreated;
                $scope.stopDate = response.data.stopDate;
                angular.copy(response.data.stops, $scope.stops);
                $scope._showMap($scope.stops);
            }, function (error) {
                // Failure
                $scope.errorMessage = "Failed to load data: " + error;
                toastr["error"]("Failed To Load Trip Data");
            })
            .finally(function () {
                $scope.isBusy = false;
            });
        }

        $scope.getStops();

        // ADDS A STOP TO TRIP
        $scope.addStop = function () {

            $scope.isBusy = true;

            $http.post(OdsRoot + "/api/trips/" + $scope.paramspName + "/stops", $scope.newStop)
                .then(function (response) {
                    // Success
                    $scope.stops.push(response.data);
                    toastr["success"]($scope.newStop.name + " Saved");
                    $scope._showMap($scope.stops);
                    $scope.newStop = {};
                }, function (error) {
                    $scope.errorMessage = "Failed to add new stop" + error;
                    toastr["error"]("Failed To Save Stop");
                })
                .finally(function () {
                    $scope.isBusy = false;
                });
        };

        // Delete Remove Stop
        $scope.deleteStop = function (tripId, stopId, stopName) {
            $scope.isBusy = true;
            $scope.errorMessage = "";


            $http.delete(OdsRoot + "/api/trips/" + tripId + "/stops/" + stopId)
           .then(function (response) {
               // Success
               $('.odsModal').modal('hide');
               toastr["success"](stopName + " Deleted");
               $scope.getStops();
           }, function (error) {
               // Failure
               $scope.errorMessage = "Failed to delete " + stopName + ": " + error;
               toastr["error"]("Failed To Delete Stop");
           })
           .finally(function () {
               $scope.isBusy = false;
           });

        };

        $scope.modal = function (tripId, stopId, stopName) {

            console.log(tripId + " " + stopId + " " + stopName);

            $('.odsModal').modal('show');

            $scope.modalData =
                {
                    TripId: tripId,
                    StopId: stopId,
                    StopName: stopName
                };

        };

        $('.odsModal').on('hidden.bs.modal', function (e) {
            $scope.modalData = null;
            console.log(e);
            console.log($scope.modalData)
        })

        $scope.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 26.714, lng: -80.053 },
            zoom: 6
        });

        $scope.input = document.getElementById('name');

        $scope.autocomplete = new google.maps.places.Autocomplete($scope.input);

        $scope.autocomplete.bindTo('bounds', $scope.map);

        $scope.infowindow = new google.maps.InfoWindow();

        $scope.marker = new google.maps.Marker({
            map: $scope.map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        $scope.autocomplete.addListener('place_changed',
            function () {
                $scope.marker.setVisible(false);
                var place = this.getPlace();
                if (!place.geometry) {
                    toastr["error"]("No Location Found");
                    return;
                }
                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    $scope.map.fitBounds(place.geometry.viewport);
                } else {
                    $scope.map.setCenter(place.geometry.location);
                    $scope.map.setZoom(17);  // Why 17? Because it looks good.
                }
                $scope.marker.setIcon(/** @type {google.maps.Icon} */({
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(35, 35)
                }));
                $scope.marker.setPosition(place.geometry.location);
                $scope.marker.setVisible(true);
                var address = '';
                if (place.address_components) {
                    address = [
                      (place.address_components[0] && place.address_components[0].short_name || ''),
                      (place.address_components[1] && place.address_components[1].short_name || ''),
                      (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }
                $scope.infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                $scope.infowindow.open(map, $scope.marker);
                //Updates The Stop Name
                _setName(place.formatted_address);
            });


        $('.datepickerOds').pickadate({
            // Escape any “rule” characters with an exclamation mark (!).
            format: 'mm/dd/yyyy',
            formatSubmit: 'mm/dd/yyyy',
            onSet: function (context) {
                _setFormattedDate(_getFormattedDate(new Date(context.select)));

            }
        });


        function _setName(name) {
            // This allows angular to update the name.
            $scope.$apply(function () {
                $scope.newStop.name = name;
            });
        }

        //Sets The Stop Date
        function _setFormattedDate(dateFormated) {
            $scope.$apply(function () {
                $scope.newStop.stopDate = dateFormated;
            });
        }

        // Formats Date In mm/dd/yyyy Format
        function _getFormattedDate(date) {
            var year = date.getFullYear();
            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return month + '/' + day + '/' + year;
        }

        $scope._setErrorMessage = function (message) {
            $scope.$apply(function () {
                $scope.errorMessage = message;
                console.log(message);
            });
        }

        // Manages GMAP
        $scope._showMap = function (stops) {

            if (stops && stops.length > 0) {
                stops = $filter('orderBy')(stops, 'stopDate');

                stops = _.map(stops,
                    function (item) {
                        return {
                            location: item.name,
                            stopover: true
                        };
                    });

                $scope.directionsService = new google.maps.DirectionsService();
                $scope.directionsDisplay = new google.maps.DirectionsRenderer();

                var start = stops.slice(0, 1);
                var end = stops.slice((stops.length - 1), stops.length);
                var waypoints = stops.length < 3 ? [] : (stops.slice(1, (stops.length - 1))).slice(0, 8);

                console.log(waypoints);

                var request =
                    {
                        origin: start[0].location,
                        destination: end[0].location,
                        waypoints: waypoints,
                        provideRouteAlternatives: false,
                        travelMode: 'DRIVING',
                        drivingOptions: {
                            departureTime: new Date(/* now, or future date */),
                            trafficModel: 'pessimistic'
                        },
                        unitSystem: google.maps.UnitSystem.IMPERIAL
                    };

                $scope.directionsService.route(request, function (result, status) {
                    if (status === 'OK') {
                        $scope.directionsDisplay.setDirections(result);
                    }
                    if (status === 'ZERO_RESULTS') {
                        // Try HTML5 geolocation.
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                var pos = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                };
                                $scope.infowindow = new google.maps.InfoWindow({ map: $scope.map });
                                $scope.infowindow.setOptions(
                                {
                                    content: '<h3><span class="tag blue"><i class="fa fa-map-marker" aria-hidden="true"></i></span> My Location </h3>'
                                });
                                $scope.infowindow.setPosition(pos);
                                $scope.map.setCenter(pos);
                            }, function () {
                                handleLocationError(true, $scope.infowindow, $scope.map.getCenter());
                            });
                        } else {
                            // Browser doesn't support Geolocation
                            handleLocationError(false, infoWindow, $scope.map.getCenter());
                        }

                        toastr["error"]('No Route Found!');
                        $scope._setErrorMessage("No possible route found, try deleting some stops. (" + status + ")");
                    }
                });

                $scope.directionsDisplay.setMap($scope.map);
                $scope.directionsDisplay.setPanel(document.getElementById('directionsPanel'));

            }
            else {
                // Try HTML5 geolocation.
                if (navigator.geolocation) {

                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        var infoWindow = new google.maps.InfoWindow({ map: $scope.map });
                        infoWindow.setOptions(
                        {
                            content: '<h3><span class="tag blue"><i class="fa fa-map-marker" aria-hidden="true"></i></span> My Location </h3>'
                        });
                        infoWindow.setPosition(pos);
                        $scope.map.setCenter(pos);
                    }, function () {
                        handleLocationError(true, infoWindow, $scope.map.getCenter());
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, $scope.map.getCenter());
                }
            }

            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(browserHasGeolocation ?
                                      'Error: The Geolocation service failed.' :
                                      'Error: Your browser doesn\'t support geolocation.');
            }

        }

    }
})();