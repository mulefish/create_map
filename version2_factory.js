class Factory {

    constructor(width, height) {
        this.width = width
        this.height = height
        this.svg = d3.select('svg')
        this.setup()

    }

    setup() { 
        const myimage = this.svg.append('image')
           // .attr('xlink:href', 'http://localhost:3030/world_map_PNG15_cropped.png')
           .attr('xlink:href', 'world_map_PNG15_cropped.png')
           .attr('width', this.width)
           .attr('height', this.height)
           .attr('id', 'picture')
    }



}