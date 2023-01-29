var menu = document.getElementById("menu")
var loading = document.getElementById("loading")
var main = document.getElementById("mainSection")

var selectedMenu = 0
var selectedSubMenu = -1
var subClicked = false

async function buildMenu(firstRun = true) {

  if(!firstRun) {
    loading.style.display = "block"
    main.style.display = "none"
  }  

  try {
    menu.innerHTML = ""
    modules = await fetch('https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/modules.json').then(res => res.json())

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
    if(firstRun) loading.classList.add("e")
  }

  if(!firstRun) {
    setTimeout(() => {
      loading.style.display = "none"
      main.style.display = "block"
    }, 700);
  }
}

buildMenu()

async function mainDoc(moduleNum) {
  if(subClicked) return
  selectedMenu = moduleNum
  selectedSubMenu = -1
  buildMenu(false)
}

async function subDoc(moduleNum, componentNum) {
  subClicked = true
  selectedMenu = moduleNum
  selectedSubMenu = componentNum
  await buildMenu(false)
  subClicked = false
}