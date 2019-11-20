
function setup() { 
    const table = document.getElementById(CATEGORY_TABLE_ID)         
    for ( let catName in CATEGORIES ) {
        const row = table.insertRow(0)
        const cell1 = row.insertCell(0)
        cell1.innerHTML = `<input type="radio" name="setCategory" onchange="handleCategoryChange('${catName}' );" value="${catName}" id='${catName}'><label for='${catName}'>${catName}</label>`    
    }
}

function addCategory() { 
    const catName = prompt("Enter new category", "");
    if ( catName != null && catName != undefined && catName.length > 0 ) {
        if ( ! CATEGORIES.hasOwnProperty(catName)) { 
            const table = document.getElementById(CATEGORY_TABLE_ID)         
            const row = table.insertRow(0)
            const cell1 = row.insertCell(0)
            cell1.innerHTML = `<input type="radio" name="setCategory" onchange="handleCategoryChange('${catName}' );" value="${catName}" id='${catName}'><label for='${catName}'>${catName}</label>`    
            CATEGORIES[catName] = {}
        } 
    }
}

function handleCategoryChange(catName) {
    ACTIVE_CAT = catName
    let html = `<table id='${SUB_CATEGORY_TABLE_ID}' border='1'>`  
    for ( let subCatKey in CATEGORIES[catName]) {
            const obj = CATEGORIES[catName][subCatKey];
            html += "<tr>"
            html += `<td><div class='colorblock' style="background-color:${obj.clr}">&nbsp;</div>`
            html += `<td><input type="radio" name="setSubCategory" onchange="handleSubCategoryChange('${subCatKey}' );" value="${subCatKey}" id='${subCatKey}'><label for='${subCatKey}'>${subCatKey}</label></td>`    
            html += `<td><div id='xy${subCatKey}'>${obj.xy}</div></td>`    
            html += "</tr>"           
    }
    document.getElementById(SUB_CATEGORY_DIV_ID).innerHTML = html
}

function saveSubCategoryGridInfo() {
    let info = factory.getGridInformation()
    CATEGORIES[ACTIVE_CAT][ACTIVE_SUB_CAT].xy = info    
    
}
function handleSubCategoryChange(subCat) {
    ACTIVE_SUB_CAT = subCat
    ACTIVE_CLR = CATEGORIES[ACTIVE_CAT][ACTIVE_SUB_CAT].clr
    console.log('ACTIVE_CLR', ACTIVE_CLR, 'ACTIVE_SUB_CAT', ACTIVE_SUB_CAT, 'ACTIVE_CAT', ACTIVE_SUB_CAT )
    console.log( CATEGORIES[ACTIVE_CAT][ACTIVE_SUB_CAT].xy)
    factory.remove() 
}

function addSubCategory() {

    if ( ACTIVE_CAT === undefined ) {
        alert("need to  choose an active category first")
    } else {
        const subCatName = prompt("Enter new sub category", "");
        if ( subCatName != null && subCatName != undefined && subCatName.length > 0 ) {
            ACTIVE_SUB_CAT = subCatName
            const table = document.getElementById(SUB_CATEGORY_TABLE_ID)         
            const row = table.insertRow(0)
            const cell1 = row.insertCell(0)
            const cell2 = row.insertCell(1)
            const cell3 = row.insertCell(2)
            let clr = getRandomColor()
            cell1.innerHTML=`<div class='colorblock' style="background-color:${clr}">&nbsp;</div>`
            cell2.innerHTML = `<input type="radio" name="setSubCategory" onchange="handleSubCategoryChange('${ACTIVE_SUB_CAT}' );" value="${ACTIVE_SUB_CAT}" id='${ACTIVE_SUB_CAT}'><label for='${ACTIVE_SUB_CAT}'>${ACTIVE_SUB_CAT}</label>`    
            cell3.innerHTML = `<div id='xy_${ACTIVE_SUB_CAT}'> </div>`

            CATEGORIES[ACTIVE_CAT][ACTIVE_SUB_CAT] = {}
            CATEGORIES[ACTIVE_CAT][ACTIVE_SUB_CAT].clr = clr            
            CATEGORIES[ACTIVE_CAT][ACTIVE_SUB_CAT].xy = []
        }
    }
}
const getRandomColor = (() =>{ 
    const seed_ary = "0123456789ABCDEF".split("")
    let clr = "#"
    for ( let i =  0; i < 6; i++) {
        clr += seed_ary[Math.floor(Math.random()*seed_ary.length)];
    }
    return clr  
})
