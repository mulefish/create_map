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
    dragStarted() {
        console.log("start")
        this.isDragging = true
    }
    dragMove() {
        console.log( this.isDragging + "move ")
    }
    dragEnded() {
        console.log("end")
        this.isDragging = false
    }
    makeCell(over, down, size ) {
        let id = over + "_" + down

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
        .on("click", (d) => {
            if ( activeClr != undefined ) {
                // d.clr = activeClr
                // this.data[d.id].attr("fill", activeClr).attr("fill-opacity", 0.7)
                // console.log( JSON.stringify(d))
                if ( d.clr === this.defaultClr) {
                    d.clr = activeClr
                    this.data[d.id].attr("fill", d.clr).attr("fill-opacity", 0.7)
                } else {
                    d.clr = this.defaultClr
                    this.data[d.id].attr("fill", d.clr).attr("fill-opacity", 0.01)
                }
            }
        })
        .on("mouseenter", (d) => {
            if ( activeClr != undefined && isDown === true ) {
                    if ( d.clr === this.defaultClr) {
                        d.clr = activeClr
                        this.data[d.id].attr("fill", d.clr).attr("fill-opacity", 0.7)
                    } else {
                        d.clr = this.defaultClr
                        this.data[d.id].attr("fill", d.clr).attr("fill-opacity", 0.01)
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
        let down = 0
        while (down < this.height) {
            let over = 0
                while (over < this.width) {
                this.makeCell(over, down, size)
                over += size
            }
            down += size
            over = 0
        }
    }
}