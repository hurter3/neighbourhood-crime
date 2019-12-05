
var mapMarkers = [];
var places, infoWindow;

function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        zoomControl: true,
    scaleControl: true,
        center: {

            // Sunbury
            lat: 51.41870117,
            lng: -0.41840180

        },
        disableDefaultUI: true
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var locations = [

        // A =
        { lat: 51.41899999, lng: -0.41840180 },

        // B = 
        { lat: 51.41870117, lng: -0.41844444 },

        // C = 
         { lat: 51.4184444, lng: -0.41840180 },
         
        // D = 
         { lat: 51.41870117, lng: -0.41840180 },

        // E = 
         { lat: 51.41870117, lng: -0.41840180 },

        // F = 
         { lat: 51.41870117, lng: -0.41840180 },

        // G =  
         { lat: 51.41870117, lng: -0.41840180 },

        // H = 
         { lat: 51.41870117, lng: -0.41840180 },

        // I = 
         { lat: 51.41870117, lng: -0.41840180 },

        // J = 
         { lat: 51.41870117, lng: -0.41840180 },

        // K = 
         { lat: 51.41870117, lng: -0.41840180 },

  
    ];

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}


function showOnMap(mapDetails, mapLocs, mapLabels, mapNames) {
    
       // This function returns all the markers into "markers" which is passed to MarkerClusterer to be clustered

    var map = new google.maps.Map(document.getElementById("map"), mapDetails);

    var mapMarkers = mapLocs.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: mapLabels[i % mapLabels.length]
        });
        mapMarkers[i] = new google.maps.Marker({
            position: mapLocs[i]
        });
    });


    for (i = 0; i < mapLocs.length; i++) {

        var markerName = mapNames[i].slice(0)

        google.maps.event.addListener(mapMarkers[i], 'click', function() {

            var marker = this;

            var infoWindow = new google.maps.InfoWindow({
                content: markerName
            });

            infoWindow.open(map, marker);

        });

        // Add the marker to the map
        mapMarkers[i].setMap(map);

    }
}