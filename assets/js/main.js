
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


$.getJSON("assets/data/streetcrime.json", function(json) {
 var streetCrimeData = json;
    console.log(streetCrimeData);
    CreateTableFromJSON(streetCrimeData);
});


  

function CreateTableFromJSON(streetCrimeData) {
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
    
  // creating all cells
  for (var i = 0; i < 20; i++) {
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
      if (streetCrimeData[i].outcome_status===null) {
          var cellText = document.createTextNode("still under investigation");
      } else
            var cellText = document.createTextNode(streetCrimeData[i].outcome_status);
      cell.appendChild(cellText);
      row.appendChild(cell);
     
      
    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.getElementById("crimeTable").appendChild(tbl);
//  element.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
}







    

//var pieSlices = [];
//var lastSlice;


//        for (var i = 0; i < sliceName.length; i++) {
//            lastSlice = sliceName;
//            console.log(lastSlice);

//        for (var i = 0; i < sliceName.length; i++) {
//            var selectedSlice = $(sliceName[i]).attr("class").split(" ");
//            pieSlices = pieSlices.concat(selectedSlice[i]);
//         console.log(pieSlices);

//        }





