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
        this.defaultClr = "#ffffff"
    }
    addCircle(x, y) {
        const dot = background.append('circle')
            .attr('cx', x - 8)
            .attr('cy', y - 8)
            .attr('r', 4)
            .attr('fill', '#000000')
            .attr('fill-opacity', 0.5)


    }
    setup() {

        background = this.svg.append("g")
        
        myimage = background.append('image')
            // .attr('xlink:href', 'world_map_PNG15_cropped.png')
            .attr('xlink:href', 'colonial_conquest_map.png')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('id', 'picture')
            .on('click', function(d) {
                addCircle(d3.event.x, d3.event.y)
            })
    }
}