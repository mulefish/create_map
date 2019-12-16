const points = [{
    x: 100,
    y: 100
},
{
    x: 200,
    y: 200
},
{
    x: 300,
    y: 300
},
{
    x: 400,
    y: 400
},
{
    x: 500,
    y: 500
},
{
    x: 600,
    y: 600
},

]
let dragging = false
let updown=false
let svg = d3.select('svg')
let container = svg.append('g')
let zoomTrans = {
    x: 0,
    y: 0,
    scale: 1
}
let data = {}
container.append("image")
.attr("width", (1.5 * width) + "px")
.attr("xlink:href", "world_map_PNG15_cropped.png")
.attr("xlink:href", "colonial_conquest_map.png")
.on("mousemove", mousemove)
.on("mouseup", mouseup)
.on("click", click)

function click() {
    console.log("click! ", click )
}

function mousedown() {
    updown = false 
    const m = d3.mouse(this);
    console.log("mousedown", updown, "  " , m)
}

function mouseup() {  
    updown = true 
    const m = d3.mouse(this);
    console.log("mouseup", updown, "  " , m)
}

function init() {
    let zoom = d3.zoom()
        .scaleExtent([0.25, 4.25])
        .on("zoom", () => {
            zoomTrans.x = d3.event.transform.x
            zoomTrans.y = d3.event.transform.y
            zoomTrans.scale = d3.event.transform.k
            container.attr("transform", d3.event.transform)
        })

    svg.call(zoom)
        .on("dblclick.zoom", null)
}

function drawStuff() {

console.log(JSON.stringify(points))

    points.forEach((point) => {
        container.append('circle')
        .attr('r', 4 * circleRadius)
        .attr('cx', point.x)
        .attr('cy', point.y)
        .attr('fill', '#ff6633')
        .attr('fill-opacity', 1.0)
        .attr('stroke', '#000000')
        .attr('stroke-opacity', 1.0)
})
}

function mousemove() {
    //const m = d3.mouse(this);
    //console.log("updown", updown, "  " , m)
}


///////////////////
drawStuff()

///////////////////// ////////// ////
var vertical = d3.select(".chart")
.append("div")
.attr("class", "remove")
.style("position", "absolute")
.style("z-index", "19")
.style("width", "1px")
.style("height", "380px")
.style("top", "10px")
.style("bottom", "30px")
.style("left", "0px")
.style("background", "#fff");


init();
