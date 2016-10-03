// Manages GMAP
(function () {
    $("#map")
        .ready(function () {
            var stops = [
                {
                    arrival: "2016-10-04T00:00:00",
                    id: 1,
                    latitude: 33.748995,
                    longitude: -84.387982,
                    name: "West Palm Beach, Florida",
                    order: 0,
                    userName: "Default",
                }
            ];

            var mapStops = [
                {
                    info: "West Palm Beach, Florida",
                    lat: 26.714389,
                    long: -80.053192
                }
            ];

            // Show Map
            travelMap.createMap({
                stops: mapStops,
                selector: "#map",
                currentStop: 0,
                initialZoom: 6
            });
        });
})();