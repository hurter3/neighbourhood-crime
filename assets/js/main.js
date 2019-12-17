

initScreen();


function initScreen(){
     document.getElementById("crimeTable").innerHTML = "<h5 class='msgHeader'>To view a listing of Crime details you can select one or more categories from the pie chart and their relevant markers will be highlighted on the map. </h5>"; 
    $(document).ready(function(){
  $(".chartHeader").hide();
  });
}

checkUserInput();

queue()
    .defer(d3.json, "assets/data/streetcrime.json")
    .await(makeGraphs);

function makeGraphs(error, transactionsData) {
    var chart = dc.pieChart("#piechart");
    var ndx = crossfilter(transactionsData);
    var name_dim = ndx.dimension(dc.pluck('category'));
    var total_per_category = name_dim.group().reduceCount();
    chart.height(350)
        .radius(100)
        .transitionDuration(1500)
        .dimension(name_dim)
        .group(total_per_category)
        .slicesCap(4)
        .legend(dc.legend());

    dc.renderAll();
}

function writeToDocument(url) {
    getData(url, function(data) {
        for (var i = 0; i < data.length; i++) {
            document.getElementById("data").innerHTML += `${data[i].name} <br>`;
             }
         });
        showClearHideOtherButtons();
};

function writeToDocument3(url) {
    getData(url, function(data) {
        for (var i = 0; i < data.length; i++) {
           document.getElementById("data").innerHTML += `${data[i].bio}<br>`;
             }
         });
        showClearHideOtherButtons();
};

function clearDocument() {
    $(document).ready(function() {
            $("#data").empty();
        });
         $(document).ready(function() {
            $("#crimeTable").empty();
        });
        hideClearShowOtherButtons()
}


function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
    xhr.open("GET", url);
    xhr.send();
}





function checkUserInput() {

    // If Stop and Search is clicked 

    $("#stopandsearch-link").click(function() {

        // Show Stop and Search bar charts

        stopAndSearch();
    });



    // If the Piechart is clicked on 

    $("#piechart").click(function() {

        $(document).ready(function() {
            $("table").empty();
        });

        piechartSliceSelected();

    });
}




function stopAndSearch() {

clearPageSetHeaders();
  
    queue()
        .defer(d3.json, "assets/data/stopandsearch.json")
        .await(makeBarGraphs);

    function makeBarGraphs(error, transactionsData) {

        var ndx = crossfilter(transactionsData);
        var gender_dim = ndx.dimension(dc.pluck('gender'));
        var total_per_gender = gender_dim.group().reduceCount();
        dc.barChart('#per-gender')
            .width(300)
            .height(200)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(gender_dim)
            .group(total_per_gender)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Gender")
            .yAxis().ticks(10);

        var store_dim = ndx.dimension(dc.pluck('officer_defined_ethnicity'));
        var total_per_ethnicity = store_dim.group().reduceCount();
        dc.barChart('#per-ethnicity')
            .width(400)
            .height(200)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(gender_dim)
            .group(total_per_ethnicity)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Ethnicity")
            .yAxis().ticks(10);

        var state_dim = ndx.dimension(dc.pluck('outcome_linked_to_object_of_search'));
        var total_per_age_range = state_dim.group().reduceCount();
        dc.barChart('#per-success')
            .width(300)
            .height(200)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(gender_dim)
            .group(total_per_age_range)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Operation successfull")
            .yAxis().ticks(10);

        dc.renderAll();
    }
     $(document).ready(function(){
  $(".chartHeader").show();
  });
}

function clearPageSetHeaders() {

$(document).ready(function() {
            $("article").empty();
        });
        
$(document).ready(function() {
            $("crimeTable").empty();
        });
        
  $(document).ready(function(){
  $(".msgHeader").hide();
  });
  
  document.getElementById("crimeTable").innerHTML = ""; 
}



//defualt category on initial build
var pieSliceNone = "none";

var splitCategoryArray = pieSliceNone.split(', ');


var locationsArray = [{ lat: 51.418049, lng: -0.431713 }];
   $(document).ready(function(){
       $(".btn1").hide();
  });
   $(document).ready(function(){
  $(".chartHeader").hide();
  });


function piechartSliceSelected() {

    var selectedGroup = document.getElementById("selected-filter").innerText;
    var selectedFilter = $(".filter");
    var pieSliceCategories = selectedFilter[0].innerText.split(": ")[0];
    var splitCategoryArray = pieSliceCategories.split(', ');

    $.getJSON("assets/data/streetcrime.json", function(json) {
        var streetCrimeData = json;
        
    createTableDetails(splitCategoryArray, streetCrimeData);
     buildMarkersArray(splitCategoryArray, streetCrimeData);
    });
    
   
}

function createTableDetails(splitCategoryArray, streetCrimeData) {

    if (splitCategoryArray[0] !== "none") {

        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        // Create a <tr> and <th> element with headings.

        var row = document.createElement("tr");
        var cell = document.createElement("th");
        var cellText = document.createTextNode("CATEGORY");
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("th");
        var cellText = document.createTextNode("CRIME ID");
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("th");
        var cellText = document.createTextNode("LOCATION");
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("th");
        var cellText = document.createTextNode("LONGITUDE");
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("th");
        var cellText = document.createTextNode("LATITUDE");
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("th");
        var cellText = document.createTextNode("OUTCOME STATUS");
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cell = document.createElement("th");
        var cellText = document.createTextNode("PERSISTENT ID");
        cell.appendChild(cellText);
        row.appendChild(cell);

        tblBody.appendChild(row);
       
        for (var c = 0; c < splitCategoryArray.length; c++) {
            for (var i = 0; i < streetCrimeData.length; i++) {
                // creating all cells    
               
                if (splitCategoryArray[c] === streetCrimeData[i].category) {
       
                    // creates a table row
                    var row = document.createElement("tr");

                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    var cell = document.createElement("td");
                   
                    var cellText = document.createTextNode(streetCrimeData[i].category);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(streetCrimeData[i].id);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(streetCrimeData[i].location.street.name);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(streetCrimeData[i].location.longitude);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(streetCrimeData[i].location.latitude);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode("still under investigation");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(streetCrimeData[i].persistent_id);
                    cell.appendChild(cellText);
                    row.appendChild(cell);

                    // add the row to the end of the table body
                    tblBody.appendChild(row);
                  


                }
            }
        }

     

        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        document.getElementById("crimeTable").appendChild(tbl);
        //  element.appendChild(tbl);
        // sets the border attribute of tbl to 2;
        tbl.setAttribute("border", "2");
    }
}









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
}
