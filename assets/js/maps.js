var mapMarkers = [];
var infoWindow;

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
    var locations = [{ lat: 51.41870117, lng: -0.41840180 }];
   
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}





function buildMarkersArray(splitCategoryArray, streetCrimeData) {

let locationArray = [];
        for (var c = 0; c < splitCategoryArray.length; c++) {

            for (var i = 0; i < streetCrimeData.length; i++) {
                if (streetCrimeData[i].category === splitCategoryArray[c] ) {
                     locationArray.push(new google.maps.LatLng(streetCrimeData[i].location.latitude, streetCrimeData[i].location.longitude));
                    }
        }
        console.log(locationArray);
        console.log(typeof(locationArray));
        }


    var mapLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // The map names will appear in the infowindow of the markers. I couldn't work out how to get the names from the 
    // google api, so I created my own solution to make the names appear in the marker infoWindow (see showOnMap in maps.js)

    var mapNames = [];

    var mapDetails = {
        center: {
            lat: 51.41870117,
            lng: -0.41840180
        },
        zoom: 13
    };

    // The following function is in maps.js. It shows the selected locations on the Map.

    showOnMap(mapDetails, locationArray, mapLabels, mapNames);
}


function showOnMap(mapDetails, mapLocs, mapLabels, mapNames) {
console.log("within showOnMap");
console.log(mapLocs);
console.log(typeof(mapLocs));
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

        //        var markerName = mapNames[i].slice(0)

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
    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

}
