function addCategory() {
    // step 1 - add category
    const catName = prompt("Enter new category", "");
    if ( catName != null && ! categories.hasOwnProperty(catName)) {
        insertCategory(catName)  
    }
}
const insertCategory = ((catName) => {
    // step 2 - add category
    const clr = getRandomColor()   
    const table = document.getElementById('categoryTable')         
    const row = table.insertRow(0)
    const cell1 = row.insertCell(0)
    const cell2 = row.insertCell(1)
    categories[catName] = []
    cell1.innerHTML = `<div class='colorblock' style="background-color:${clr}">&nbsp;</div>`
    cell2.innerHTML = `<input type="radio" name="setCategory" onchange="handleCategoryChange('${catName}');" value="${catName}" id='rb_${catName}'><label for='rb_${catName}'>${catName}</label>`
})

const getRandomColor = (() =>{ 
    // step 3 - add category
    const seed_ary = "0123456789ABCDEF".split("")
    let clr = "#"
    for ( let i =  0; i < 6; i++) {
        clr += seed_ary[Math.floor(Math.random()*seed_ary.length)];
    }
    return clr  
})
const handleCategoryChange = ((catName) => {
    // step 4 - add category
    // step 1 - add sub category
    let html = `<button onClick="addSubCategory('${catName}')">AddSubCategory</button><br>`
    html += `<table border='1' id='subCategoryTable'>`
    categories[catName].forEach((item)=>{
        categories[catName] = []
        html += `<tr><td><div class='colorblock' style="background-color:${item.clr}">&nbsp;</div></td>`
        html += `<td><input type="radio" name="setSubCategory" onchange="handleSubCategoryChange('${catName}', '${item.id}');" value="${item.id}" id='${catName}_${item.id}'><label for='${catName}_${item.id}'>${catName} ${item.id}</label></td></tr>`
    })
    html += "</table>"
    document.getElementById('subCategoryTableDiv').innerHTML = html      

})

const addSubCategory = ((catName) => {
    // step 2 - add sub category
    console.log( catName )
    console.log( JSON.stringify(categories, null, 2 ))
    const subCatName = prompt("Enter new sub category", "");
    if ( subCatName != null ) {
        insertSubCategory(catName, subCatName)  
    }
})

const insertSubCategory = ((catName, subCatName) => {
    // step 3 - add sub category

    const clr = getRandomColor()   
    const table = document.getElementById('subCategoryTable')         
    const row = table.insertRow(0)
    const cell1 = row.insertCell(0)
    const cell2 = row.insertCell(1)
    const cell3 = row.insertCell(1)
    cell1.innerHTML = `<div class='colorblock' style="background-color:${clr}">&nbsp;</div>`
    cell2.innerHTML = `<input type="radio" name="setCategory" onchange="handleSubCategoryChange('${catName}','${subCatName}' );" value="${catName}" id='${catName}_${subCatName}'><label for='${catName}_${subCatName}'>${catName} ${subCatName}</label>`
    cell3.innerHTML = `<div id='d_${catName}_${subCatName}'></div>`

    categories[catName].push({id:subCatName, clr:clr})
    console.log('insertSubCategory' , catName, subCatName )
    console.log(JSON.stringify(categories, null, 2 ))
   
})