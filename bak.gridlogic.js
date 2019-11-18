function gridData() {
    let data = new Array();
    let xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    let ypos = 1;
    // let width = w / 30 ;
    // let height = w / 30 ;
    let size = 10
    let click = 0;
    let down = 0;
    let row = 0
    while (down < w) {

        data.push(new Array());

        // iterate for cells/columns inside rows
        let over = 0
        //for (var column = 0; column < 10; column++) {
        while (over < w) {
            data[row].push({
                x: xpos,
                y: ypos,
                width: size,
                height: size,
                click: click
            })
            // increment the x position. I.e. move it over by 50 (width variable)
            xpos += size;
            over += size
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += size;
        row++
        down = row * size
    }
    return data;
}

gridData = gridData();

const grid = d3.select("#grid")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

const row = grid.selectAll(".row")
    .data(gridData)
    .enter().append("g")
    .attr("class", "row");

const column = row.selectAll(".square")
    .data(function(d) {
        return d;
    })
    .enter().append("rect")
    .attr("class", "square")
    .attr("x", function(d) {
        return d.x;
    })
    .attr("y", function(d) {
        return d.y;
    })
    .attr("width", function(d) {
        return d.width;
    })
    .attr("height", function(d) {
        return d.height;
    })
    .style("fill", "#ff0ff0")
    .style("opacity", 0.3)
    .style("stroke", "#222")
    .on('click', function(d) {
        d.click++;
        if ((d.click) % 4 == 0) {
            d3.select(this).style("fill", "#fff");
        }
        if ((d.click) % 4 == 1) {
            d3.select(this).style("fill", "#2C93E8");
        }
        if ((d.click) % 4 == 2) {
            d3.select(this).style("fill", "#F56C4E");
        }
        if ((d.click) % 4 == 3) {
            d3.select(this).style("fill", "#838690");
        }
    });