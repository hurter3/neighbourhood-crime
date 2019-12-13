
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
    var chart= dc.pieChart("#piechart");
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
            console.dir(data);
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

    $("#piechart ").click(function() {
        
        $(document).ready(function(){
    $("table").empty();
  });

        piechartSliceSelected();
        
    });
}

    
    
    
    function stopAndSearch() {

 
   
    
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
    
  
    CreateTableFromJSON(splitCategoryArray,streetCrimeData);
});  

}

function CreateTableFromJSON(splitCategoryArray,streetCrimeData) {

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
console.log("?????????????????" +locationsArray)


for (var c = 0; c < splitCategoryArray.length; c++) {
var insertcounter = 0;   
console.log("entering c loop     " + c);
  for (var i = 0; i < streetCrimeData.length; i++) {
  // creating all cells    
  console.log("entering IIII loop    " + i);
  console.log(splitCategoryArray[c]);
  console.log(streetCrimeData[i].category);
    if(splitCategoryArray[c] === streetCrimeData[i].category) {
console.log("entering tr==================   " + insertcounter);   
insertcounter = insertcounter+1;

if (locationsCount===0) {
locationsArray = locationsArray.concat("{ lat:" + streetCrimeData[i].location.latitude +",lng:" + streetCrimeData[i].location.longitude + "}");
}

else {
locationsArray = locationsArray.concat(",{ lat:" + streetCrimeData[i].location.latitude +",lng:" + streetCrimeData[i].location.longitude + "}");
};
locationsCount = locationsCount +1;
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
      if (streetCrimeData[i].outcome_status===null) {
          var cellText = document.createTextNode("still under investigation");
      } else
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

}





    



var mapMarkers = [];
var places, infoWindow;

function initMap(locationsArray) {
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
    
    console.log("lllllllllllllooooooooocccccccccc" + locationsArray);
    var locations = 
    [{ lat:51.418049,lng:-0.431713},{ lat:51.421859,lng:-0.440270},{ lat:51.419718,lng:-0.410112},{ lat:51.422195,lng:-0.419015},{ lat:51.407875,lng:-0.432766},{ lat:51.425015,lng:-0.432122},{ lat:51.423491,lng:-0.415748},{ lat:51.417734,lng:-0.418277},{ lat:51.424624,lng:-0.429158},{ lat:51.423450,lng:-0.439554},{ lat:51.422913,lng:-0.435703},{ lat:51.416966,lng:-0.414723},{ lat:51.425224,lng:-0.438357},{ lat:51.415525,lng:-0.433252},{ lat:51.421046,lng:-0.428547},{ lat:51.419635,lng:-0.415910},{ lat:51.419635,lng:-0.415910},{ lat:51.419635,lng:-0.415910},{ lat:51.425618,lng:-0.421457},{ lat:51.423491,lng:-0.415748},{ lat:51.415525,lng:-0.433252}];
 

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