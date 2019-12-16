# Neighbourhood-crime

Stream Two Project: Interactive Front-End - Code Institue
 
This project has been sourced from open police data (https://data.police.uk).
It was designed to give the user a statistical interactive snapshot of the ast months crime 
event in the neighbourhood.



## Technologies.
- Adobe XD,
  - To design the mockup for full screen and mobile which was also changed slightly while 
    developing the website. This can be found in the assets/wireframe folder.
- HTML5
  - Elements 
- Bootstrap
  - Used the Grid structure and styling classes provided to build the basic layout.
- CSS
  - Expanded the style.css file to enhance the structure that was built using Bootstrap.
- JavaScript
  - Collapsible Navbar and the main body of the project to manipulate the DOM.
- jQuery
  - Used to show/hide and clear Elements.

  

## Features

The user is presented with a dashboard of the previous months crime history in the Sunbury community.
There is a pieChart with the top 4 crime categories and the 5th slice being 'other' to unclutter the graph.
To the right is a googlemap of the area.
As the user clicks a pieSlice I dynamically build a relevant table below of related crimes.
If more than one slice is selected then this will form a group and be listed in the title above the pieChart,
as well as all categories listed in the table. If a previosly selected sliced is clicked for the second
time then this is remoed from the group.
At the same time the last selected category of crimes are represented via markers on the google.maps.
At the bottom of the screen there are 3 buttons which when clicked will list the collective data below.
When each button is clicked then they are all hidden and a CLEAR buttton appears and visa versa when the CLEAR
button is clcked the data is deleted, the button is hidden and the other 3 buttons are displayed.

On the navbar there is a Stop and Search link that with clear down the entire article are (pieChart,
Google map and bottom buttons and display 3 interactive bar charts of Stop and Search activity 
in the area for the last month.



## Features Left to Implement
Enhancement would be to expand the website with a dropdown selection list of other surrounding areas and 
a selection month so the user can explore areas and time frames of their choice. 


## Testing.
- Added the required Grid structure, with colors to each section with placeholders and tested they worked for different device sizes.
- Checked that the navbar tabs redirected you to the correct sections.
- Tested the buttons to ensure they displayed the relevant data and were hidden/shown as per design.
- I still need to include Jasmine scripts.





## Deployment
GitHub was frequently used from the initial commit and after each milestone or test fix to ensure 
no rework was required. In the first few weeks the updates might have been sparse as i encountered
technical issues trying to get a handle on the pieChart title to build the relevant data table and 
map the crime markers.
The master branch https://github.com/hurter3/neighbourhood-crime was used throught this project.
The website is published using [GitHub Pages](https://hurter3.github.io/neighbourhood-crime/)

## Credits
Tutor group, Haley and Stephen for the support and giving me relevant hints of what to explore to achive
my goal.

### Author
Mark Hurter

### API
I used CURL to create 2 flat files as a driver for the website. The below buttons also use API functionality
to build the relevant data list at the bottom of the screen.
 

### Acknowledgement

Bootstrap ,W3Schools, DC.JS and stackoverflow were a great resource to enhance the ideas delivered through the
course work material.  




