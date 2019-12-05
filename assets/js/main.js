

checkUserInput();

queue()
    .defer(d3.json, "assets/data/streetcrime.json")
    .await(makeGraphs);

function makeGraphs(error, transactionsData) {
   

    var ndx = crossfilter(transactionsData);
    var name_dim = ndx.dimension(dc.pluck('category'));
    var total_per_category = name_dim.group().reduceCount();
    dc.pieChart('#piechart')
        .height(350)
        .radius(100)
        .transitionDuration(1500)
        .dimension(name_dim)
        .group(total_per_category)
        .slicesCap(4);
        dc.dataTable('#table')
          .width(300)
          .height(480)
          .dimension(name_dim)
          .size(Infinity)
          .group(total_per_category)
           .columns(['category', 'location', 'id']);
    
          
             dc.renderAll();
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


function piechartSliceSelected() {
var pieSlices = [];    
var sliceName = $(".pie-slice-group").children(".selected");

console.log(sliceName);
        
        for (var i = 0; i < sliceName.length; i++) {
            
            var selectedSlice = $(sliceName[i]).attr("textContent").split(" ");
            pieSlices = pieSlices.concat(selectedSlice[1]);
         console.log(pieSlices);

        }
}