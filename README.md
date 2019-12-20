# Neighbourhood-crime

Stream Two Project: Interactive Front-End - Code Institue


## Purpose.

Unfortunately crime is increasing in our communities and the public needed to be enlighted 
to the account of incidents in their neighbourhood. The best way to achieve this was by a visual
representation through charts and map locations to make it feel close to home.


## Technologies.
- Adobe XD,
  - To design the mockup for full screen and mobile devices, this was modified as the data was analysed through development. This can be found in the assets/wireframe folder.
- HTML5
  - The elements represent the skeleton with ID's and CLASSES so that JavaScript or jQuery where able to target them as desired.    
- Bootstrap
  - Used the Grid structure and styling classes provided to build the basic layout and form a platform.
- CSS
  - Expanded the style.css file to enhance the structure that was built using Bootstrap.
- JavaScript
  - Collapsible Navbar and the main body of the project to manipulate the DOM.
- jQuery
  - Used to read JSON files, show/hide and clear Elements.
- Crossfilter/D3/DC 
  - Has been used to produce the pie and barcharts.
- W3C Validator.
  - To highlight HTML5 hiccups.


## Features

 The user is presented with a dashboard of the previous months crime history in the Sunbury community.
 There is a pieChart with the top 6 crime categories and the 7th slice being 'Other' to unclutter the graph.
 To the right is a google map of the local area.
 As the user selects 1 or more piechart slices (being a crime category) the individual incidents are listed in a data table below.
 All selected categories will be listed in the "selected:" title above the pieChart.
 If a previosly selected slice is clicked for the second time then this is removed from the group.
 All relevant incidents will be reflected on the googles map via markers or cluster markers.

 On the navbar there is a Stop and Search link that will clear down the entire front page (pieChart, map) and display 3 interactive bar charts with Stop and Search activity.



## Testing.

#### Jasmine.

The website has been designed using D3/DC and google maps and as a result there are not many functions
returning values without user interaction hence the Jasmine testing is limited but resides in the Jasmine folder.

#### Navigation.
There is one index.html page that is maniuplated to appear like there are 2 pages when the 
'Stop and Search' tab on the navbar is clicked.
When the 'Sunbury' anchor and the HOME tabs are selected the main page will be refreshed. 
The 'Stop and Search' tab will clear the entire index.html page and present 3 interactive barchcharts.
Lastly, there is a 3rd tab 'Data Source', which will navigate you to a new page where the open API data was sourced from
by means of target="_blank" to ensure the current website is not lost.

#### Manual.

- Ensure the piechart is rendered.
- Ensure the map is displayed with 1 marker representing the center of the neighbourhood.
- A description should appear in the footer.

- Check that the piechart is centered in it's element.
- There should only be 7 slices as the piechart has a slicecap of 6 hence the smaller categories a grouped into 'Other'.
- When you hover over each pieSlice then you mush see the correct infoWindow displaying the correct category and crime count. (eg: "violent-crime: 52").
- When a pieSlice is clicked:
  - The crime incident markers need to be mapped and be represented by cluster markers.
  - The markers total needs to match the category selected.
  - The footer info will be cleared and a dataTable will be generated with the incident of the selected category.
  - Ensure the table count matches the selected slice count (eg:52).
- If more than one pieSlice is clicked:
  - All relevant category's need to appear in the "select:" list above the piechart.(eg:"selected: violent-crime, vehicle-crime")
  - The map needs to be updated to reflect all incidents from the selected list (eg: 52 + 21 for the above selection).
  - The data table must also include indidents from all the selected categories. (eg: 52 + 21 rows for the above selection).
- When a previous selected slice is clicked for the second time:
  - The category needs to be removed from the "select:" list. (for example if vehicle-crime was selected then you should only see "selected: violent-crime"
  - The categories markers need to be removed from the map and leave all other selected categories. (only 52 left from above deselection).
  - The category needs to be removed from the data table. (only have 52 rows left from the above deselection).
- If all categeries are selected (including 'Other'), 
  -There should be 14 categories listed and the piechart needs to remain within it's element and reflected on the map and data table.

- When the 'Stop and Search' is selected:
  - The piechart, map and datatable needs to be emptied and 3 barcharts with there headers need to appear on the index.html page.
  - The barcharts should be evenly spread across the page.
  - When a column is selected the charts need to be interactive.

- When the home tab is selected then the page will be refreshed and only reflect the original piechart, map and footer description.

- Under no senario should any header or element remain on the page from the previous selection.

- And repeat just to make sure all is good.

#### Code Sanity

- Used W3C Validator to ensure HTML5 was good. Unfortunately there was 1 error on a script 'error bad value anonymous for attribute crossorigin on element script'. I could not resolve this and the CDN was obtained from code.jquery.com
- In DEV tools I noticed a cookie warning and resource that could not be loaded but they looked unrelated but obviously not 
  - A cookie associated with a cross-site resource at http://google.com/ was set without the `SameSite` attribute. A future release of Chrome will only deliver cookies with cross-site requests if they are set with `SameSite=None` and `Secure`. You can review cookies in developer tools under Application>Storage>Cookies and see more details at https://www.chromestatus.com/feature/5088147346030592 and https://www.chromestatus.com/feature/5633521622188032.
  -  /favicon.ico:1 Failed to load resource: the server responded with a status of 503 ()

## Deployment
GitHub was frequently used from the initial commit and after each milestone or test fix to ensure 
no rework was required. In the first few weeks the updates might have been sparse as i encountered
technical issues trying to get a handle on the pieChart title to build the relevant data table and 
map the crime markers.
The master branch https://github.com/hurter3/neighbourhood-crime was used throught this project.
The website is published using [GitHub Pages](https://hurter3.github.io/neighbourhood-crime/)

## Credits
Map from google.com

### Author
Mark Hurter

### API
I used CURL to create 2 flat files as a driver for the website. 
 

### Acknowledgement

Course material, mini resume project.
Bootstrap ,W3Schools, DC.JS and stackoverflow were a great resource.
Mentor advise from Aaron Sinnott
Tutor group take the credit for amazing advise after I depleated the Slack resources.

## Features Left to Implement
Enhancements to expand the website with a dropdown selection list of other surrounding areas and 
a monthly selection list so the user can explore areas / time frames of their choice.


I had already tested further API functoinality but it did not fit in with the current SCOPE of the project..


HTML5

<div class="container-fluid bg-light">
                <!--        <button class="btn1 button clear" onclick="clearDocument()">Clear</button>  -->

                <!--            <button class="btn2 button" onclick="writeToDocument('https://data.police.uk/api/crime-categories?')">Categories</button> -->
                <!--            <button class="btn3 button" onclick="writeToDocument('https://data.police.uk/api/forces')">Forces</button> -->
                <!--            <button class="btn4 button" onclick="writeToDocument(' https://data.police.uk/api/surrey/neighbourhoods')">Neighbourhoods</button> -->

               >
                
            </div>


JavaScript 


function writeToDocument(url) { >
    getData(url, function(data) {
        for (var i = 0; i < data.length; i++) {
            document.getElementById("data").innerHTML += `${data[i].name} <br>`;
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

