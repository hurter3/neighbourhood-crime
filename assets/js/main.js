
checkUserInput();

var streetCrimeData;
        

loadJsonData('https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592');

function loadJsonData(url) {
    getData(url, function(data) {
    streetCrimeData = data;
    console.log(streetCrimeData);
        
    });
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

//.defer(d3.json, "assets/data/streetcrime.json")

queue()
    .defer(d3.json, streetCrimeData)
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
    


var selectedGroup = document.getElementById("selected-filter").innerText;
console.log('selectedGroup');
console.log(selectedGroup);

var selectedFilter = $(".filter");
console.log('selectedFilter');
console.log(selectedFilter);
console.log('selectedFilter[0].innerText.split(": ")[0]');
console.log(selectedFilter[0].innerText.split(": ")[0]);


}


function CreateTableFromJSON() {
    
    var col = [];

 var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    
}

var pieSlices = [];
var lastSlice;


//        for (var i = 0; i < sliceName.length; i++) {
//            lastSlice = sliceName;
//            console.log(lastSlice);

//        for (var i = 0; i < sliceName.length; i++) {
//            var selectedSlice = $(sliceName[i]).attr("class").split(" ");
//            pieSlices = pieSlices.concat(selectedSlice[i]);
//         console.log(pieSlices);

//        }
