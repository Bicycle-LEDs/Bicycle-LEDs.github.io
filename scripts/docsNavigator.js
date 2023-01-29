var menu = document.getElementById("menu")

var loading = document.getElementById("loading");
var main = document.getElementById("mainSection");
var e 

function error() {
  setTimeout(() => {
    loading.style.animationName = "loadingError"
    loading.style.animationDelay = "0s"
    loading.style.animationDuration = "3s"
    loading.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error'
    var announcment = document.getElementById("announcment")
    announcment.innerHTML = announcment.innerHTML + '<br />' + '<i class="fa-solid fa-bug"></i> Errors occured'
    setTimeout(() => {
      loading.style.display = "none"
      main.style.display = "block"
    }, 2500);
  }, 2500)
}

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
    error(); e=1
  }
}

asyncMenu()

window.onload = function() {
  setTimeout(() => {
    if(e) return;
    loading.style.display = "none"
    main.style.display = "block"
  }, 2000);
}