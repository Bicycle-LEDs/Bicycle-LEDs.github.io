var menu = document.getElementById("menu")

fetch('https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/modules.json').then(res => res.json()).then((modules) => {

  modules.forEach(module => {

    menu.innerHTML = menu.innerHTML + "\n" + '<ul onclick="mainDoc(' + module.name + ')" id="' + module.name + '">' + module.name
    fetch("https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/" + module.path + "/main.json").then(res => res.json()).then((moduleJson) => {

      let moduleMenu = document.getElementById(module.name)
      let i = 0
      moduleJson.components.forEach(component => {

        moduleMenu.innerHTML = moduleMenu.innerHTML + "\n" + '<li class="sub" onclick="subDoc('+ module.name + ', ' + i + ')">' + component.menuname + "</li>"
        i++
      })
    })
    menu.innerHTML = menu.innerHTML + "</ul>"
  });
})
