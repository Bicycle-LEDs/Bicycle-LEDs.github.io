var menu = document.getElementById("menu")

async function asyncMenu() {
  try {
    modules = await fetch('https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/modules.json').then(res => res.json())
    
    for (let k = 0; k < modules.length; k++) {
      menu.innerHTML = menu.innerHTML + "\n" + '<ul onclick="mainDoc(' + k + ')" id="' + modules[k].name + '">' + modules[k].name

      let moduleJson = await fetch("https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/" + modules[k].path + "/main.json").then(res => res.json())
      
      let moduleMenu = document.getElementById(modules[k].name)
      for (let i = 0; i < moduleJson.components.length; i++) {
        moduleMenu.innerHTML = moduleMenu.innerHTML + "\n" + '<li class="sub" onclick="subDoc('+ k + ', ' + i + ')">' + moduleJson.components[i].menuname + "</li>"
      }

      menu.innerHTML = menu.innerHTML + "</ul>"
    }
  }
  catch(err) {
    var loading = document.getElementById("loading")
    loading.classList.add("e")
  }
}

asyncMenu()