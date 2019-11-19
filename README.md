## create_map

For a game we need a map. Finding apropo maps is difficult. This tool allows the creation of anontated information to go along w/ some image. 

## How to use  
*First time*
Step1: Click 'AddCategory' button and add a category (e.g., 'countries' or 'farmland' or whatever). Repeat as needed.
Step2: Select a radio button from the newly added categories and click on 'AddSubCategory'. Repeat as needed. The
Step3: In the dropdown select choose the pixel granularity you want for the map. This will overlay a grid onto the image.
Step4: Select a subcategory's radio button and click or mousemove+mousedown in the grid. Each touched cell will toggle ( color ) between belonging to that subcategory.  
Step5: Hit SaveCellSelection to save data to that subcategory.
Step6: GoTo Step4 as needed

Step7: Hit the 'save' button to write to localStorage.

*Second time*
This will attempt to use localStorage first. 

## running

Currently there is *zero* backend. It will use localstorage in the browser for persistance. So you will need to supply a webserver. I use: 

python3 -m http.server 3030

## map
http://pngimg.com/uploads/world_map/world_map_PNG15.png
http://pngimg.com/imgs/miscellaneous/world_map/

## TODOs

1: Get a backend
2: more...
