let layers = {}
let activeCategory = ""
let activeSubCategory = ""
const seed_ary = "0123456789ABCDEF".split("")

function lookupColor() {
    let clr = undefined
    try {
        data[activeCategory].forEach((item) => {
            if (item.id === activeSubCategory) {
                clr = item.clr
            } else {}
        })
        return clr
    } catch (needToChoose) {
        alert('need to choose a category and a subcategory first\n' + needToChoose)
    }
}

function save() {
    localStorage.setItem('categories', JSON.stringify(categories))
    localStorage.setItem('data', JSON.stringify(data))
    console.log('save() called at ' + new Date())
}

function remove() {
    //localStorage.clear();
    localStorage.removeItem('categories');
    localStorage.removeItem('data');
    console.log('remove() called at ' + new Date())
}

function show() {
    const objGraphAsString = localStorage.getItem('categories');
    const obj = JSON.parse(objGraphAsString)
    console.log(JSON.stringify(obj, null, 2))
    const objGraphAsString2 = localStorage.getItem('data');
    const obj2 = JSON.parse(objGraphAsString2)
    console.log(JSON.stringify(obj2, null, 2))
    console.log('show() called at ' + new Date())
}


function getRandomColor() {
    let clr = "#"
    for (let i = 0; i < 6; i++) {
        clr += seed_ary[Math.floor(Math.random() * seed_ary.length)];
    }
    return clr
}

function addLayerFromLocalStorage() {
    try {
        const table = document.getElementById("myTable");
        const objGraphAsString = localStorage.getItem('categories');
        const LoH = JSON.parse(objGraphAsString)
        LoH.forEach((category) => {
            const clr = category.clr
            const layerName = category.cat
            const row = table.insertRow(0);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            layers[layerName] = clr
            cell1.innerHTML = `<div class='colorblock' style="background-color:${clr}">&nbsp;</div>`
            cell2.innerHTML = `<input type="radio" name="layer" onchange="handleLayerChange('${layerName}');" value="${layerName}"><br>`
            cell3.innerHTML = `<a href="#" onclick="javascript:selectLayer('${layerName}')">${layerName}</a>`
        })
    } catch (boom) {
        console.log('Attempted to load data from localstorage. ' + boom)
    }
}
addLayerFromLocalStorage()
function addLayer() {
    const categoryName = prompt("Enter category name", "");
    if (categoryName != null && !layers.hasOwnProperty(categoryName)) {
        const clr = getRandomColor()
        const table = document.getElementById("myTable");
        const row = table.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        layers[layerName] = clr
        cell1.innerHTML = `<div class='colorblock' style="background-color:${clr}">&nbsp;</div>`
        cell2.innerHTML = `<input type="radio" name="layer" onchange="handleLayerChange('${layerName}');"  checked='true' value="${layerName}"><br>`
        cell3.innerHTML = `<a href="#" onclick="javascript:selectLayer('${layerName}')">${layerName}</a>`
        activeCategory = categoryName
        inflate_subCategory()
    }
}

function selectLayer(layerName) {
    alert(layerName)
}

function handleLayerChange(category) {
    clearViewport()
    activeCategory = category
    inflate_subCategory(category)
}

// Fake react!
const w = 1250 // window.innerWidth
const h = 606 // window.innerWidth
const dom = `<svg width='${w}' height='${h}' style="background: url('http://localhost:3030/world_map_PNG15_cropped.png') no-repeat;" id='grid'></svg>`
document.getElementById('svgdiv').innerHTML = dom

function inflate_subCategory(category) {
console.log('inflate_subCategory')
document.getElementById("subCategorySelectWidget").style.display = "block";
let table = "<table border='1' id='subCats'>"




data[category].forEach((item, i) => {
    table += `<tr><td>${item.id}</td><td><div class='colorblock' style="background-color:${item.clr}">&nbsp;</div></td><td><input type="radio" name="subCategory" onchange="handleSubCategoryChange('${item.id}');"  value="${item.id}"></td><td><div class='information' id='data_${item.id}'></div></tr>`
})
table += "</table>"
document.getElementById("subcat").innerHTML = table
}

function handleSubCategoryChange(subcat) {
activeSubCategory = subcat
}

function addSubCat() {
const subcatName = prompt("Enter subcat name", "");
const clr = getRandomColor()
const table = document.getElementById("subCats");
const row = table.insertRow(0)
const cell1 = row.insertCell(0)
const cell2 = row.insertCell(1)
const cell3 = row.insertCell(2)
const cell4 = row.insertCell(3)
cell1.innerHTML = `${subcatName}`
cell2.innerHTML = `<div class='colorblock' style="background-color:${clr}">&nbsp;</div>`
cell3.innerHTML = `<input type="radio" name="subCategory" onchange="handleSubCategoryChange('${subcatName}');"  value="${subcatName}">`
cell4.innerHTML = `<div class='information' id='data_${subcatName}'></div>`




data[activeCategory].push({
    'id': subcatName,
    'clr': clr
})
console.log(JSON.stringify(data, null, 2))
console.log("...")
console.log('activeCategory', activeCategory)
console.log('subcatName', subcatName)
}



// ///////////////////////////////////// ////////////
function gridData() {
    let data = new Array();
    let xpos = 1 //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    let ypos = 1
    let size = 50
    let down = 0
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
                clr:"#ffffff"
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

let theGridData = gridData();

const grid = d3.select("#grid")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

const row = grid.selectAll(".row")
    .data(theGridData)
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
    .style("stroke", "#000000")
    .style("stroke-width", 1)
    .style("fill", function(d) { return d.clr } )
    .style("opacity", 0.1)

    .on('click', function(d) {
        // const clr = lookupColor()
        d.clr = lookupColor()
        console.log( JSON.stringify( d, null, 2 ))
        if (clr != undefined) {
            d3.select(this).style("fill", d.clr).style("opacity", .50)
            console.log("CLICKED " + JSON.stringify(d, null, 2))
        } else {
            alert("NOPE " + JSON.stringify(d))
        }
    });


function clearViewport() {

}