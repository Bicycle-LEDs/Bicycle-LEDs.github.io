var menu = document.getElementById("menu")
var description = document.getElementById("desc")
var loading = document.getElementById("loading")
var main = document.getElementById("mainSection")

var selectedMenu = -1
var selectedSubMenu = -1
var subClicked = false

async function buildMenu(firstRun = false) {

  if(!firstRun) {
    loading.style.display = "block"
    main.style.display = "none"
  }  

  try {
    menu.innerHTML = ""
    let modules = await fetch('https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/modules.json').then(res => res.json())

    for (let k = 0; k < modules.length; k++) {
      let moduleJson = await fetch("https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/" + modules[k].path + "/main.json").then(res => res.json())
      if(selectedSubMenu == -1 && selectedMenu == k) menu.innerHTML = menu.innerHTML + "\n" + '<ul onclick="mainDoc(' + k + ')" class="selected" id="' + modules[k].name + '">' + modules[k].name
      else menu.innerHTML = menu.innerHTML + "\n" + '<ul onclick="mainDoc(' + k + ')" id="' + modules[k].name + '">' + modules[k].name
      let moduleMenu = document.getElementById(modules[k].name)

      for (let i = 0; i < moduleJson.components.length; i++) {
        if(selectedMenu == k && selectedSubMenu == i) moduleMenu.innerHTML = moduleMenu.innerHTML + "\n" + '<li class="selected" onclick="subDoc('+ k + ', ' + i + ')">' + moduleJson.components[i].menuname + "</li>"
        else moduleMenu.innerHTML = moduleMenu.innerHTML + "\n" + '<li onclick="subDoc('+ k + ', ' + i + ')">' + moduleJson.components[i].menuname + "</li>"
      }

      menu.innerHTML = menu.innerHTML + "</ul>"
    }
  }

  catch(err) {
    var title = document.getElementById("title")
    if(firstRun) title.style.animation = "loadingError 2s infinite"
  }
}

async function showDocs() {

  description.innerHTML = ""

  if(selectedMenu == -1) {
    description.innerHTML = '<h1>Choose a valid component or module from menu <i class="fa-solid fa-sitemap"></i></h1>'
    return
  }

  try {

    let modules = await fetch('https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/modules.json').then(res => res.json())
    let moduleJson = await fetch("https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/" + modules[selectedMenu].path + "/main.json").then(res => res.json())

    if(selectedSubMenu != -1) {

      // Component info
      description.innerHTML = '<h1><i class="fa-solid fa-circle-info"></i> ' + moduleJson.components[selectedSubMenu].name + '</h1>'

      let checkImage = await fetch('https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/' + modules[selectedMenu].path + "/components/" + moduleJson.components[selectedSubMenu].picture, { method: 'HEAD' })
      if(checkImage.ok) description.innerHTML = description.innerHTML + '<br /><img src="https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/' + modules[selectedMenu].path + "/components/" + moduleJson.components[selectedSubMenu].picture + '">'
      else description.innerHTML = description.innerHTML + `<br /><h1 class="info"><i class="fa-solid fa-triangle-exclamation"></i> Can't load image</h1>`

    }

    else {

      // Module info
      description.innerHTML = '<h1><i class="fa-solid fa-circle-info"></i> ' + moduleJson.name + '</h1>'

      let checkImage = await fetch('https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/' + modules[selectedMenu].path + "/" + moduleJson.picture, { method: 'HEAD' })
      if(checkImage.ok) description.innerHTML = description.innerHTML + '<br /><img src="https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/' + modules[selectedMenu].path + "/" + moduleJson.picture + '">'
      else description.innerHTML = description.innerHTML + `<br /><h1 class="info"><i class="fa-solid fa-triangle-exclamation"></i> Can't load image</h1>`
    }
  }

  catch(err) {
    var title = document.getElementById("title")
    if(selectedMenu == -1) title.style.animation = "loadingError 2s infinite"
  }

  
  setTimeout(() => {
    loading.style.display = "none"
    main.style.display = "block"
  }, 400);
}


buildMenu(true)
showDocs()

async function mainDoc(moduleNum) {
  if(subClicked) return
  selectedMenu = moduleNum
  selectedSubMenu = -1
  await buildMenu()
  await showDocs()
}

async function subDoc(moduleNum, componentNum) {
  subClicked = true
  selectedMenu = moduleNum
  selectedSubMenu = componentNum
  await buildMenu()
  await showDocs()
  subClicked = false
}