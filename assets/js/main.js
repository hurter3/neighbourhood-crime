checkUserInput();


//var streetCrimeData;


//loadJsonData('https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592');

//function loadJsonData(url) {
//    getData(url, function(data) {
//    streetCrimeData = data;
//    console.log(streetCrimeData);

//    });
//}

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

//.defer(d3.json, "assets/data/streetcrime.json")
//.defer(d3.json, streetCrimeData)


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
    // example of formatting the legend via svg
    // http://stackoverflow.com/questions/38430632/how-can-we-add-legends-value-beside-of-legend-with-proper-alignment
    //      chart.on('pretransition', function(chart) {
    //          chart.selectAll('.dc-legend-item text')
    //              .text('')
    //            .append('tspan')
    //              .text(function(d) { return d.name; })
    //            .append('tspan')
    // /             .attr('x', 100)
    //              .attr('text-anchor', 'end')
    //              .text(function(d) { return d.data; });

    //      });
    dc.renderAll();
}

function writeToDocument(url) {
    getData(url, function(data) {
        for (var i = 0; i < data.length; i++) {
            document.getElementById("data").innerHTML += `${data[i].name} <br>`;
        }
    });
}



var select = document.getElementById("select-area"),
    arr = ["Sunbury", "Feltham", "Shepperton", "Kingston", "Richmond", "Walton", "Sunbury", "Feltham", "Shepperton", "Kingston", "Richmond", "Walton", "Sunbury", "Feltham", "Shepperton", "Kingston", "Richmond", "Walton"];
for (var i = 0; i < arr.length; i++) {
    var option = document.createElement("OPTION"),
        txt = document.createTextNode(arr[i]);
    option.appendChild(txt);
    option.setAttribute("value", arr[i]);
    select.insertBefore(option, select.lastChild);

}

var select = document.getElementById("select-month"),
    arr = ["2019-09", "2019-08", "2019-07", "2019-06"];
for (var i = 0; i < arr.length; i++) {
    var option = document.createElement("OPTION"),
        txt = document.createTextNode(arr[i]);
    option.appendChild(txt);
    option.setAttribute("value", arr[i]);
    select.insertBefore(option, select.lastChild);

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

function writeToDocument(url) {
    getData(url, function(data) {
        for (var i = 0; i < data.length; i++) {
            document.getElementById("data").innerHTML += `${data[i].name} <br>`;
            console.dir(data);
        }
    });
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

 $(document).ready(function() {
            $("article").empty();
        });

    queue()
        .defer(d3.json, "assets/data/stopandsearch.json")
        .await(makeBarGraphs);

    function makeBarGraphs(error, transactionsData) {

        var ndx = crossfilter(transactionsData);
        var gender_dim = ndx.dimension(dc.pluck('gender'));
        var total_per_gender = gender_dim.group().reduceCount();
        dc.barChart('#per-gender')
            .width(300)
            .height(150)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(gender_dim)
            .group(total_per_gender)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Gender")
            .yAxis().ticks(10);

        var store_dim = ndx.dimension(dc.pluck('self_defined_ethnicity'));
        var total_spend_per_store = store_dim.group().reduceCount();
        dc.barChart('#per-ethnicity')
            .width(500)
            .height(250)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(gender_dim)
            .group(total_spend_per_store)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Store")
            .yAxis().ticks(10);

        var state_dim = ndx.dimension(dc.pluck('age_range'));
        var total_per_age_range = state_dim.group().reduceCount();
        dc.barChart('#per-age-range')
            .width(800)
            .height(150)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(gender_dim)
            .group(total_per_age_range)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Age Range")
            .yAxis().ticks(10);

        dc.renderAll();
    }
}

//defualt category on initial build
var pieSliceNone = "none";
console.log(typeof(pieSliceNone));
var splitCategoryArray = pieSliceNone.split(', ');
console.log(typeof(splitCategoryArray));
console.log(splitCategoryArray);
var locationsArray = [{ lat: 51.418049, lng: -0.431713 }];


function piechartSliceSelected() {

    console.log("sliceselected function");

    var selectedGroup = document.getElementById("selected-filter").innerText;
    console.log('selectedGroup');
    console.log(selectedGroup);

    var selectedFilter = $(".filter");
    console.log('selectedFilter');
    console.log(selectedFilter);
    console.log('selectedFilter[0].innerText.split(": ")[0]');
    console.log(selectedFilter[0].innerText.split(": ")[0]);

    //var splitCategoryArray = [];

    var pieSliceCategories = selectedFilter[0].innerText.split(": ")[0];
    var splitCategoryArray = pieSliceCategories.split(', ');
    console.log(splitCategoryArray);





    $.getJSON("assets/data/streetcrime.json", function(json) {
        var streetCrimeData = json;
        console.log("getjson");

        console.log(streetCrimeData);


        CreateTableFromJSON(splitCategoryArray, streetCrimeData);
    });

}

function CreateTableFromJSON(splitCategoryArray, streetCrimeData) {

    console.log("createTableFromJSON");
    console.log(splitCategoryArray[0]);
    if (splitCategoryArray[0] !== "none") {
        // get the reference for the body
        //  var element = document.getElementById("crimeTable");

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


        tblBody.appendChild(row);
        console.log("trying to reference splitCategoryArray");
        console.log(splitCategoryArray);
        console.log(splitCategoryArray);
        //    }


        var locationsArray = "[";
        var locationsCount = 0;
        console.log("?????????????????" + locationsArray)


        for (var c = 0; c < splitCategoryArray.length; c++) {
            var insertcounter = 0;
            console.log("entering c loop     " + c);
            for (var i = 0; i < streetCrimeData.length; i++) {
                // creating all cells    
                console.log("entering IIII loop    " + i);
                console.log(splitCategoryArray[c]);
                console.log(streetCrimeData[i].category);
                if (splitCategoryArray[c] === streetCrimeData[i].category) {
                    console.log("entering tr==================   " + insertcounter);
                    insertcounter = insertcounter + 1;

                    if (locationsCount === 0) {
                        locationsArray = locationsArray.concat("{ lat:" + streetCrimeData[i].location.latitude + ",lng:" + streetCrimeData[i].location.longitude + "}");
                    }

                    else {
                        locationsArray = locationsArray.concat(",{ lat:" + streetCrimeData[i].location.latitude + ",lng:" + streetCrimeData[i].location.longitude + "}");
                    };
                    locationsCount = locationsCount + 1;
                    console.log(locationsArray);

                    // creates a table row
                    var row = document.createElement("tr");


                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
                    var cell = document.createElement("td");
                    console.log("entering td");
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
                    if (streetCrimeData[i].outcome_status === null) {
                        var cellText = document.createTextNode("still under investigation");
                    }
                    else
                        var cellText = document.createTextNode(streetCrimeData[i].outcome_status);
                    cell.appendChild(cellText);
                    row.appendChild(cell);


                    // add the row to the end of the table body
                    tblBody.appendChild(row);
                    console.log("entering appendchild");


                }
            }
        }

        locationsArray = locationsArray.concat("]");
        console.log(locationsArray);

        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        document.getElementById("crimeTable").appendChild(tbl);
        //  element.appendChild(tbl);
        // sets the border attribute of tbl to 2;
        tbl.setAttribute("border", "2");
    }
    showMarkersOnMap(locationsArray,splitCategoryArray);
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
    console.log("locationsArray===============>>>>>>>>> " + typeof(locationsArray));
    //var locations = 
    //[{ lat:51.418049,lng:-0.431713},{ lat:51.421859,lng:-0.440270},{ lat:51.419718,lng:-0.410112},{ lat:51.422195,lng:-0.419015},{ lat:51.407875,lng:-0.432766},{ lat:51.425015,lng:-0.432122},{ lat:51.423491,lng:-0.415748},{ lat:51.417734,lng:-0.418277},{ lat:51.424624,lng:-0.429158},{ lat:51.423450,lng:-0.439554},{ lat:51.422913,lng:-0.435703},{ lat:51.416966,lng:-0.414723},{ lat:51.425224,lng:-0.438357},{ lat:51.415525,lng:-0.433252},{ lat:51.421046,lng:-0.428547},{ lat:51.419635,lng:-0.415910},{ lat:51.419635,lng:-0.415910},{ lat:51.419635,lng:-0.415910},{ lat:51.425618,lng:-0.421457},{ lat:51.423491,lng:-0.415748},{ lat:51.415525,lng:-0.433252}];


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



function showMarkersOnMap(locationsArray,splitCategoryArray) {
console.log(splitCategoryArray);
console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + locationsArray);

var lastSelection;
for (i=0;i<splitCategoryArray.length;i++){
    lastSelection = splitCategoryArray[i];
}




    var mapLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

if (lastSelection === "violent-crime") {
      var mapLocs = [{ lat: 51.418049, lng: -0.431713 }, { lat: 51.421859, lng: -0.440270 }, { lat: 51.419718, lng: -0.410112 }, { lat: 51.422195, lng: -0.419015 }, { lat: 51.407875, lng: -0.432766 }, { lat: 51.425015, lng: -0.432122 }, { lat: 51.423491, lng: -0.415748 }, { lat: 51.417734, lng: -0.418277 }, { lat: 51.424624, lng: -0.429158 }, { lat: 51.423450, lng: -0.439554 }, { lat: 51.422913, lng: -0.435703 }, { lat: 51.416966, lng: -0.414723 }, { lat: 51.425224, lng: -0.438357 }, { lat: 51.415525, lng: -0.433252 }, { lat: 51.421046, lng: -0.428547 }, { lat: 51.419635, lng: -0.415910 }, { lat: 51.419635, lng: -0.415910 }, { lat: 51.419635, lng: -0.415910 }, { lat: 51.425618, lng: -0.421457 }, { lat: 51.423491, lng: -0.415748 }, { lat: 51.415525, lng: -0.433252 }];
} else
if (lastSelection === "anti-social-behaviour") {
     var mapLocs = 
[{ lat:51.407011,lng:-0.406023},{ lat:51.417930,lng:-0.411511},{ lat:51.421137,lng:-0.424574},{ lat:51.421486,lng:-0.427856},{ lat:51.427830,lng:-0.414145},{ lat:51.424977,lng:-0.413309},{ lat:51.429125,lng:-0.414820},{ lat:51.413426,lng:-0.411595},{ lat:51.419362,lng:-0.420335},{ lat:51.423491,lng:-0.415748},{ lat:51.423325,lng:-0.433532},{ lat:51.423491,lng:-0.415748},{ lat:51.420067,lng:-0.431284},{ lat:51.419104,lng:-0.419179},{ lat:51.424313,lng:-0.419373},{ lat:51.417364,lng:-0.423539},{ lat:51.419010,lng:-0.422231},{ lat:51.419010,lng:-0.422231},{ lat:51.424853,lng:-0.431495},{ lat:51.422903,lng:-0.428915},{ lat:51.423491,lng:-0.415748},{ lat:51.412189,lng:-0.421891},{ lat:51.431743,lng:-0.410212},{ lat:51.423263,lng:-0.424875},{ lat:51.419263,lng:-0.425674},{ lat:51.423491,lng:-0.415748},{ lat:51.426307,lng:-0.427259},{ lat:51.419010,lng:-0.422231},{ lat:51.420772,lng:-0.421523},{ lat:51.420772,lng:-0.421523},{ lat:51.423491,lng:-0.415748},{ lat:51.419010,lng:-0.422231},{ lat:51.422606,lng:-0.430176},{ lat:51.422606,lng:-0.430176},{ lat:51.410847,lng:-0.417019},{ lat:51.421892,lng:-0.432588},{ lat:51.417441,lng:-0.434021},{ lat:51.416215,lng:-0.419681},{ lat:51.429442,lng:-0.420995},{ lat:51.417364,lng:-0.423539},{ lat:51.408646,lng:-0.430611},{ lat:51.413372,lng:-0.424280},{ lat:51.418931,lng:-0.421040},{ lat:51.429442,lng:-0.420995},{ lat:51.424977,lng:-0.413309},{ lat:51.420067,lng:-0.431284},{ lat:51.421486,lng:-0.427856},{ lat:51.405959,lng:-0.408720}]
} else
if (lastSelection === "vehicle-crime") {
     var mapLocs = 
[{ lat:51.418049,lng:-0.431713},{ lat:51.421859,lng:-0.440270},{ lat:51.419718,lng:-0.410112},{ lat:51.422195,lng:-0.419015},{ lat:51.407875,lng:-0.432766},{ lat:51.425015,lng:-0.432122},{ lat:51.423491,lng:-0.415748},{ lat:51.417734,lng:-0.418277},{ lat:51.424624,lng:-0.429158},{ lat:51.423450,lng:-0.439554},{ lat:51.422913,lng:-0.435703},{ lat:51.416966,lng:-0.414723},{ lat:51.425224,lng:-0.438357},{ lat:51.415525,lng:-0.433252},{ lat:51.421046,lng:-0.428547},{ lat:51.419635,lng:-0.415910},{ lat:51.419635,lng:-0.415910},{ lat:51.419635,lng:-0.415910},{ lat:51.425618,lng:-0.421457},{ lat:51.423491,lng:-0.415748},{ lat:51.415525,lng:-0.433252}]
} else
if (lastSelection === "criminal-damage-arson") {
     var mapLocs = 
[{ lat:51.425958,lng:-0.422711},{ lat:51.427156,lng:-0.415507},{ lat:51.419635,lng:-0.415910},{ lat:51.406797,lng:-0.406218},{ lat:51.411755,lng:-0.426364},{ lat:51.419635,lng:-0.415910},{ lat:51.427156,lng:-0.415507},{ lat:51.419010,lng:-0.422231},{ lat:51.421137,lng:-0.424574},{ lat:51.416966,lng:-0.414723},{ lat:51.419263,lng:-0.425674},{ lat:51.421046,lng:-0.428547},{ lat:51.417364,lng:-0.423539},{ lat:51.427156,lng:-0.415507},{ lat:51.429370,lng:-0.421630},{ lat:51.426172,lng:-0.418518},{ lat:51.415449,lng:-0.406262},{ lat:51.425224,lng:-0.438357},{ lat:51.413097,lng:-0.420494},{ lat:51.425122,lng:-0.423330}]
}
else { 
    if (lastSelection === "Others")
    var mapLocs = 
[{ lat:51.423579,lng:-0.422937},{ lat:51.421981,lng:-0.435217},{ lat:51.421981,lng:-0.435217},{ lat:51.414510,lng:-0.420632},{ lat:51.423491,lng:-0.415748},{ lat:51.427112,lng:-0.435632},{ lat:51.427830,lng:-0.414145},{ lat:51.408720,lng:-0.417395},{ lat:51.431743,lng:-0.410212},{ lat:51.425618,lng:-0.421457},{ lat:51.419578,lng:-0.421004},{ lat:51.419578,lng:-0.421004},{ lat:51.421424,lng:-0.418524},{ lat:51.417364,lng:-0.423539},{ lat:51.423290,lng:-0.435604},{ lat:51.409653,lng:-0.404580},{ lat:51.420067,lng:-0.431284},{ lat:51.411222,lng:-0.405604},{ lat:51.424936,lng:-0.414936},{ lat:51.414940,lng:-0.419193},{ lat:51.407875,lng:-0.432766},{ lat:51.412792,lng:-0.409302},{ lat:51.427112,lng:-0.435632},{ lat:51.422842,lng:-0.417626},{ lat:51.427082,lng:-0.421320},{ lat:51.419718,lng:-0.410112},{ lat:51.418740,lng:-0.431603},{ lat:51.407608,lng:-0.416283},{ lat:51.416966,lng:-0.414723},{ lat:51.405959,lng:-0.408720},{ lat:51.412032,lng:-0.431646},{ lat:51.420772,lng:-0.421523},{ lat:51.426307,lng:-0.427259},{ lat:51.431743,lng:-0.410212},{ lat:51.423491,lng:-0.415748},{ lat:51.407875,lng:-0.432766},{ lat:51.426120,lng:-0.416017},{ lat:51.417135,lng:-0.407958},{ lat:51.420772,lng:-0.421523},{ lat:51.417218,lng:-0.430778},{ lat:51.426401,lng:-0.423530},{ lat:51.405399,lng:-0.415827},{ lat:51.405399,lng:-0.415827},{ lat:51.427156,lng:-0.415507},{ lat:51.407875,lng:-0.432766},{ lat:51.418965,lng:-0.420895},{ lat:51.412189,lng:-0.421891},{ lat:51.417364,lng:-0.423539},{ lat:51.419718,lng:-0.410112}]
    else 
    var mapLocs = {  lat: 51.41870117, lng: -0.41840180}
    
};




//    var mapLocs = locationsArray;
//    var mapLocs = [{ lat: 51.418049, lng: -0.431713 }, { lat: 51.421859, lng: -0.440270 }, { lat: 51.419718, lng: -0.410112 }, { lat: 51.422195, lng: -0.419015 }, { lat: 51.407875, lng: -0.432766 }, { lat: 51.425015, lng: -0.432122 }, { lat: 51.423491, lng: -0.415748 }, { lat: 51.417734, lng: -0.418277 }, { lat: 51.424624, lng: -0.429158 }, { lat: 51.423450, lng: -0.439554 }, { lat: 51.422913, lng: -0.435703 }, { lat: 51.416966, lng: -0.414723 }, { lat: 51.425224, lng: -0.438357 }, { lat: 51.415525, lng: -0.433252 }, { lat: 51.421046, lng: -0.428547 }, { lat: 51.419635, lng: -0.415910 }, { lat: 51.419635, lng: -0.415910 }, { lat: 51.419635, lng: -0.415910 }, { lat: 51.425618, lng: -0.421457 }, { lat: 51.423491, lng: -0.415748 }, { lat: 51.415525, lng: -0.433252 }];

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

    showOnMap(mapDetails, mapLocs, mapLabels, mapNames);


}
