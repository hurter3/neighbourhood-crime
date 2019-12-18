


initScreen();


function initScreen(){
     document.getElementById("crimeTable").innerHTML = "<h5 class='msgHeader'>To view a listing of Crime details, select one or more categories from the pie chart and their relevant markers will be highlighted on the map. </h5>"; 
   }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// The D3/DC.js piechart is built from the streetcrime.json file that was created by means of CURL.
// Queue is used to ensure the file is loaded before the graph is rendered.
// I set the slicesCap to 6 to ensure there were not to many categories being displayed to clutter the pieChart
// and added a legend.
//
// The pichart is the driver of the crime detail table and correlating google markers.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        .slicesCap(6)
        .legend(dc.legend());

    dc.renderAll();
}


checkUserInput();


function checkUserInput() {
    
 // If the Piechart is clicked on 

    $("#piechart").click(function() {

        $(document).ready(function() {
            $("table").empty();
        });

        piechartSliceSelected();

    });
    
// If Stop and Search is clicked 

    $("#stopandsearch-link").click(function() {

        // Show Stop and Search bar charts

        stopAndSearch();
    });
}



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
                    var cellText = document.createTextNode(streetCrimeData[i].outcome_status);
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
            .width(350)
            .height(200)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(gender_dim)
            .group(total_per_gender)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Gender")
            .yAxis().ticks(10);

        var ethnic_dim = ndx.dimension(dc.pluck('officer_defined_ethnicity'));
        var total_per_ethnicity = ethnic_dim.group().reduceCount();
        dc.barChart('#per-ethnicity')
            .width(350)
            .height(200)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(gender_dim)
            .group(total_per_ethnicity)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Ethnicity")
            .yAxis().ticks(10);

        var outcome_dim = ndx.dimension(dc.pluck('outcome_linked_to_object_of_search'));
        var total_per_outcome = outcome_dim.group().reduceCount();
        dc.barChart('#per-success')
            .width(350)
            .height(200)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(gender_dim)
            .group(total_per_outcome)
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











