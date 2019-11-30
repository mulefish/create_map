function addCircle(x, y) {
    factory.addCircle(x, y)

}
let background = undefined;
let myimage = undefined;
class Factory {

    constructor(width, height) {
        this.width = width
        this.height = height
        this.svg = d3.select('svg')
        this.setup()
        this.data = {}
        this.shapes = {}
        this.defaultClr = "#ffffff"
        this.active = ""
        this.offset = - 3

    }
    emit() { 
        for ( let key in this.data ) {
            let ary = this.data[key] // This will be ary of {x,y } objects 
            console.log( key + " : " + JSON.stringify( ary ))
        }
    }
    endGroup() { 
        try { 
        const i2 = this.data[this.active].length - 1
        const p1 = this.data[this.active][0]
        const p2 = this.data[this.active][i2]
        background.append("line")
        .style("stroke", "black")
        .attr("x1", p1.x + this.offset)
        .attr("y1", p1.y + this.offset)
        .attr("x2", p2.x + this.offset)
        .attr("y2", p2.y + this.offset)
        this.active = ""
        } catch ( ignore) {
            console.log("First time through will fail so ignore this msg ( if it is the first time ) ")
        }
    }

    euclide(x,y) { 
        let x2 = 0; 
        let y2 = 0; 
        let distance = Number.MAX_SAFE_INTEGER
        let horizon = Math.abs(this.offset)
        for ( let key in this.data ) {
            const LoH = this.data[key]
            LoH.forEach((obj, i) => { 
                const a = x - obj.x;
                const b = y - obj.y;
                const c = Math.sqrt( a*a + b*b );
                if ( c < distance) {
                    distance = c
                    x2 = obj.x 
                    y2 = obj.y
                }
            })
        }

        if ( distance < horizon ) {
            x = x2
            y = y2 
        }
        return {x,y}
    }

    addCircle(x, y) {
        x -= 4 // THe mouse is a little 
        y -= 4 // off from where I think it ought to be 

        let tmp = this.euclide(x, y)
        x = tmp.x
        y = tmp.y

        if ( this.active.length > 0 ) {
            this.data[this.active].push({x:x, y:y})

            const dot = background.append('circle')
                .attr('cx', x + ( this.offset ))
                .attr('cy', y + ( this.offset ))
                .attr('r', Math.abs(this.offset))
                .attr('fill', '#000000')
                .attr('fill-opacity', 0.0)
                .attr('stroke', '#000000')
                .attr('stroke-opacity', 0.5)
                .on('click', function(d) {
                    addCircle(d3.event.x, d3.event.y)
                })

            if ( this.data[this.active].length > 1 ) { 
                const i2 = this.data[this.active].length - 1
                const i1 = this.data[this.active].length - 2 
                const p1 = this.data[this.active][i1]
                const p2 = this.data[this.active][i2]

                background.append("line")          // attach a line
                .style("stroke", "black")  // colour the line
                .attr("x1", p1.x + this.offset)     // x position of the first end of the line
                .attr("y1", p1.y + this.offset)      // y position of the first end of the line
                .attr("x2", p2.x + this.offset)     // x position of the second end of the line
                .attr("y2", p2.y + this.offset) // y position of the second;    // y position of the second end of the line

            }
        } else {
            this.addNewGroup()
        }
    }
    addNewGroup() {
        this.endGroup()
        const name = prompt("Name?", "");

        if (name != null && ! this.data.hasOwnProperty(name)) { 
            this.active = name
            this.data[this.active] = [] 
        } else {
            alert("Bad name! "  + name )
        }
    }
    setup() {
        background = this.svg.append("g")
        myimage = background.append('image')
            //.attr('xlink:href', 'colonial_conquest_map.png')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('id', 'picture')
            .on('click', function(d) {
                addCircle(d3.event.x, d3.event.y)
            })
    }
}