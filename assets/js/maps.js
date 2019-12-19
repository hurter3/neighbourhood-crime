
//////////////////////////////////////////////////////////////////////////
// initMap is used the first time the screen is displayed or refreshed
// by the script in the index.html file. 
// <script defer src="https://maps.googleapis..&callback=initMap"></script>
/////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////
// On all other occasions the buildMarkersArray will be invoke when a pieSlice is clicked 
// via function piechartSliceSelected.
// It builds 2 array, which are passed through to showOnMap.
// locationArray contains the relevant LatLng values for the marker (clustermarkers)
// and mapNames is used to displayed in the infoWindow when you hover over a label.
////////////////////////////////////////////////////////////////////////////////////////////

function buildMarkersArray(splitCategoryArray, streetCrimeData) {

    let locationArray = [];
    let mapNames = [];

    for (var c = 0; c < splitCategoryArray.length; c++) {

        for (var i = 0; i < streetCrimeData.length; i++) {
            if (streetCrimeData[i].category === splitCategoryArray[c]) {
                locationArray.push(new google.maps.LatLng(streetCrimeData[i].location.latitude, streetCrimeData[i].location.longitude));
                mapNames.push(streetCrimeData[i].location.street.name);

            }
        }
        
    }


    var mapLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // The map names will appear in the infowindow of the markers. I couldn't work out how to get the names from the 
    // google api, so I created my own solution to make the names appear in the marker infoWindow (see showOnMap in maps.js)

    //  var mapNames = [];

    var mapDetails = {
        center: {
            lat: 51.41870117,
            lng: -0.41840180
        },
        zoom: 13
    };

 
    showOnMap(mapDetails, locationArray, mapLabels, mapNames);
}


function showOnMap(mapDetails, mapLocs, mapLabels, mapNames) {
    
    // This function returns all the markers into "markers" which is passed to MarkerClusterer to be clustered

    var map = new google.maps.Map(document.getElementById("map"), mapDetails);

    var markers = mapLocs.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: mapLabels[i % mapLabels.length],
            title: mapNames[i]
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

    });


    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

}
