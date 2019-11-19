class Factory {

    constructor(width, height) {
        this.width = width
        this.height = height
        this.svg = d3.select('svg')
        this.setup()
        this.data = {} 
        this.defaultClr = "#ffffff"
        this.isDragging = false
    }

    setup() { 
        const myimage = this.svg.append('image')
           .attr('xlink:href', 'world_map_PNG15_cropped.png')
           .attr('width', this.width)
           .attr('height', this.height)
           .attr('id', 'picture')

    }

    makeCell(over, down, size, col, row ) {
        // let id = over + "_" + down
        let id = col + "_" + row

        const box = this.svg.append("rect")
        .data([{x:over, y:down, size:size, id:id, clr:this.defaultClr}])
        .attr("x", over)
        .attr("y", down)
        .attr("width", size)
        .attr("height", size)
        .attr("fill", this.defaultClr)
        .attr("fill-opacity", 0.01)
        .attr("stroke", "#000000")
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.2)
        .attr("class","box")
        .attr("id", id)
        .attr("col", col)
        .attr("row", row)
        .attr("selected", 0)
        .attr("size", size)
        .on("click", (d) => {
            // activeClr is GLOBAL var
            // isDown is GLOBAL var
            if ( activeClr != undefined ) {
                if ( d.clr === this.defaultClr) {
                    d.clr = activeClr
                    this.data[d.id].attr("fill", d.clr).attr("fill-opacity", 0.7).attr("selected", 1)
                } else {
                    d.clr = this.defaultClr
                    this.data[d.id].attr("fill", d.clr).attr("fill-opacity", 0.01).attr("selected", 0)
                }
            }
        })
        .on("mouseenter", (d) => {
            // activeClr is GLOBAL var
            // isDown is GLOBAL var
            if ( activeClr != undefined && isDown === true ) {
                if ( d.clr === this.defaultClr) {
                    d.clr = activeClr
                    this.data[d.id].attr("fill", d.clr).attr("fill-opacity", 0.7).attr("selected", 1)
                } else {
                    d.clr = this.defaultClr
                    this.data[d.id].attr("fill", d.clr).attr("fill-opacity", 0.01).attr("selected", 0)
                }
            }
        })
        this.data[id]=box
    }
    remove() {
        this.svg.selectAll(".box").remove()
        this.data = {}
    }
    paint(size) {
        this.remove()
        size = parseInt(size)
        let row = 0
        let down = 0
        let y = 0
        while (down < this.height) {
            let over = 0
            let col = 0
            while (over < this.width) {
                this.makeCell(over, down, size, col, row)
                over += size
                col++
            }
            down += size
            row++
            col = 0
            over = 0
        }
    }
    getSelectedCells() {
        let xy = []
        let size = -1
        Object.keys(this.data).forEach((key,i ) => {
            const cell = this.data[key]
            if ( i === 0 ) {
                size = cell.attr("size")
            }
            if ( cell.attr("selected") == "1" ) {
                xy.push(cell.attr("col"))
                xy.push(cell.attr("row"))
            }
        })
        return {size:size, xy:xy}
    }
}