        //, '#e6194b', '#3cb44b', , '#4363d8', '#f58231', '#911eb4', '#46f0f0', , '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
        let categories = [
            { cat:'cities', clr:'#ffe119'}, 
            { cat:'polities', clr:'#f032e6'}, 
            { cat:'roads', clr:'#ffd8b1'},
            { cat:'corruption', clr:'#a9a9a9'},
            { cat:'farming', clr:'#3cb44b'},
            { cat:'fishing', clr:'#4363d8'} 
        ]
        let data = {}
        data['cities'] = [
            {id:'Portland', clr:'#ff0000'},
            {id:'New York', clr:'#ff00f0'},
            {id:'Seattle', clr:'#ff0f00'},
            {id:'New Orleans', clr:'#fff000'}
        ]
        data['polities'] = [
                    //'#', '#', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
            {id:'Britain', clr:'#e6194b'},
            {id:'France', clr:'#3cb44b'},
            {id:'Russia', clr:'#4363d8'},
            {id:'Japan', clr:'#f58231'},
            {id:'Germany', clr:'#911eb4'},
            {id:'Turkey', clr:'#46f0f0'},
            {id:'Poland', clr:'#bcf60c'},
            {id:'Austria', clr:'#fabebe'},
            {id:'Spain', clr:'#008080'},
            {id:'Italy', clr:'#e6beff'},
            {id:'China', clr:'#9a6324'},
            {id:'Ethiopia', clr:'#fffac8'}
        ]
        data['roads'] = []
        data['corruption'] = []
        data['farming'] = []
        data['fishing'] = []
        function lookupColor() {
            let clr = undefined 
            try { 
//                return data[activeLayer][activeSubCategory].clr
data[activeLayer].forEach((item) => { 
    if ( item.id === activeSubCategory) {
        clr =  item.clr

    } else { 

    }

})
return clr 
            } catch ( needToChoose ) { 
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
            console.log(JSON.stringify(obj, null, 2 ))
            const objGraphAsString2 = localStorage.getItem('data');
            const obj2 = JSON.parse(objGraphAsString2)
            console.log(JSON.stringify(obj2, null, 2 ))
            console.log('show() called at ' + new Date())
        }
    
    let layers = {} 
    let activeLayer = ""
    let activeSubCategory = ""
    const seed_ary = "0123456789ABCDEF".split("")
    function getRandomColor() { 
        let clr = "#"
        for ( let i =  0; i < 6; i++) {
            clr += seed_ary[Math.floor(Math.random()*seed_ary.length)];
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
                cell2.innerHTML = `<input type="radio" name="layer" onchange="handleChange('${layerName}');" value="${layerName}"><br>`
                cell3.innerHTML = `<a href="#" onclick="javascript:selectLayer('${layerName}')">${layerName}</a>`
            })
        } catch ( boom ) {
            console.log('Attempted to load data from localstorage. ' + boom )
        }
    }

    function addLayer() {
        const layerName = prompt("Enter layer name", "");
        if ( layerName != null && ! layers.hasOwnProperty(layerName)) {
            const clr = getRandomColor() 
            const table = document.getElementById("myTable");
            const row = table.insertRow(0);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            layers[layerName] = clr
            cell1.innerHTML = `<div class='colorblock' style="background-color:${clr}">&nbsp;</div>`
            cell2.innerHTML = `<input type="radio" name="layer" onchange="handleChange('${layerName}');"  checked='true' value="${layerName}"><br>`
            cell3.innerHTML = `<a href="#" onclick="javascript:selectLayer('${layerName}')">${layerName}</a>`
            activeLayer = layerName
            inflate_subCategory()
        }
    }    
     
    function selectLayer(layerName) {
        alert( layerName )
    }     

    function handleChange(category) {
        activeLayer = category 
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




        data[category].forEach((item,i) => {
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




        data[activeLayer].push({'id':subcatName, 'clr':clr})
        console.log( JSON.stringify( data , null, 2 ))
        console.log("...")
        console.log('activeLayer' , activeLayer)
        console.log('subcatName', subcatName    )
    }
    