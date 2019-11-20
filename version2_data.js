let categories = {}

function save() {
    localStorage.setItem('categories', JSON.stringify(categories))
    console.log('save() called at ' + new Date())
}

function remove() {
    localStorage.removeItem('categories');
    console.log('remove() called at ' + new Date())
}

function show() {
    const objGraphAsString = localStorage.getItem('categories');
    const obj = JSON.parse(objGraphAsString)
    document.getElementById('showLocalStorage').style.display="block"
    document.getElementById('output').value = JSON.stringify(obj)
    console.log(JSON.stringify(obj, null, 2 ))
}