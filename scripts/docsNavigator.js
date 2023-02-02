// Get document elements
var menu = document.getElementById("menu")
var description = document.getElementById("description")
var image = document.getElementById("image")
var loading = document.getElementById("loading")
var main = document.getElementById("mainSection")
var title = document.getElementById("title")
var docsVersion = document.getElementById("docsVersion")

// Some temp values
var docsVersionTemp
var selectedMenu = -1
var selectedSubMenu = -1
var subClicked = false

// Main function
async function build() {

  // Hide docs, show loading
  changeAnim()
  loading.style.display = "block"
  main.style.display = "none"

  try {

    // Clear
    menu.innerHTML = ''

    // Menu builder
    let modules = await fetch('https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/modules.json').then(res => res.json())
    docsVersionTemp = '<i class="i fa-solid fa-code-compare"></i> Build ' + modules[0].version

    for (let k = 1; k < modules.length; k++) {
      let moduleJson = await fetch("https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/" + modules[k].path + "/main.json").then(res => res.json())
      if(!moduleJson.disabled) {
        // If no submenu selected, highlight menu
        if(selectedSubMenu == -1 && selectedMenu == k) menu.innerHTML = menu.innerHTML + '<ul onclick="mainDoc(' + k + ')" class="selected" id="' + modules[k].name + '">' + modules[k].name
        else menu.innerHTML = menu.innerHTML + '<ul onclick="mainDoc(' + k + ')" id="' + modules[k].name + '">' + modules[k].name
        let moduleMenu = document.getElementById(modules[k].name)
  
        for (let i = 0; i < moduleJson.components.length; i++) {
          // If submenu selected, highlight it
          if(moduleJson.components[i].disabled) return
          if(selectedMenu == k && selectedSubMenu == i) moduleMenu.innerHTML = moduleMenu.innerHTML  + '<li class="selected" onclick="subDoc('+ k + ', ' + i + ')">' + moduleJson.components[i].menuname + "</li>"
          else moduleMenu.innerHTML = moduleMenu.innerHTML + '<li onclick="subDoc('+ k + ', ' + i + ')">' + moduleJson.components[i].menuname + "</li>"
        }

        menu.innerHTML = menu.innerHTML + "</ul>"
      }
    }

    // If just loaded page
    if(selectedMenu == -1) {
      description.classList.add("noData")
      description.innerHTML = '<h1 id="err" style="text-align: center"><i class="i fa-solid fa-sitemap"></i> Choose a component or module</h1>'
      document.getElementById("err").style.animation = "loadingError 5s infinite"
    }
    else {

      // Clear
      description.classList.remove("noData")
      description.style.width = ''
      description.style.marginTop = ''
      description.innerHTML = ''
      image.innerHTML = ''

      // Description builder
      let moduleJson = await fetch("https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/" + modules[selectedMenu].path + "/main.json").then(res => res.json())

      // No submenu selected
      if(selectedSubMenu != -1) {
  
        // Name
        description.innerHTML = '<h1><i class="i fa-solid fa-atom"></i> ' + moduleJson.components[selectedSubMenu].name + '</h1>'
  
        // Subtitle
        description.innerHTML = description.innerHTML + '<h2><i class="fa-solid fa-boxes-stacked"></i> Inside ' + modules[selectedMenu].name + '</h2>'
  
        // Description
        if(moduleJson.components[selectedSubMenu].description) description.innerHTML = description.innerHTML + '<h3><i class="i fa-solid fa-circle-info"></i> ' + moduleJson.components[selectedSubMenu].description + '</h3>'
        else description.innerHTML = description.innerHTML + `<h3 class="info"><i class="fa-solid fa-triangle-exclamation"></i> No description</h3>`
  
        // Buy links
        /*
        ------------
        --- TODO ---
        ------------
        */

        // Image
        for (let i = 0; i < moduleJson.components[selectedSubMenu].pictures.length; i++) {
          let checkImage = await fetch('https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/' + modules[selectedMenu].path + "/components/" + moduleJson.components[selectedSubMenu].pictures[i], { method: 'HEAD' })
          if(checkImage.ok) image.innerHTML = image.innerHTML + '<img src="https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/' + modules[selectedMenu].path + "/components/" + moduleJson.components[selectedSubMenu].pictures[i] + '">'
          else image.innerHTML = image.innerHTML + `<h1 class="info"><i class="fa-solid fa-triangle-exclamation"></i> No image</h1>`
        }
      }
    
      // Selected submenu
      else {
      
        // Name
        description.innerHTML = '<h1><i class="i fa-solid fa-box-archive"></i> ' + moduleJson.name + '</h1>'
  
        // Subtitle
        if(moduleJson.subtitle) description.innerHTML = description.innerHTML + '<h2><i class="fa-solid fa-circle-info"></i> ' + moduleJson.subtitle + '</h2>'
        else description.innerHTML = description.innerHTML + `<h2 class="info"><i class="fa-solid fa-triangle-exclamation"></i> No subtitle</h2>`
  
        // Description
        /*
        ------------
        --- TODO ---
        ------------
        */
  
        // Image
        for (let i = 0; i < moduleJson.pictures.length; i++) {
          let checkImage = await fetch('https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/' + modules[selectedMenu].path + "/" + moduleJson.pictures[i], { method: 'HEAD' })
          if(checkImage.ok) image.innerHTML = image.innerHTML + '<img src="https://raw.githubusercontent.com/Bicycle-LEDs/electronics/main/' + modules[selectedMenu].path + "/" + moduleJson.pictures[i] + '">'
          else image.innerHTML = image.innerHTML + `<h1 class="info"><i class="fa-solid fa-triangle-exclamation"></i> No image</h1>`
        }
      }
    }
    
    // Show docs again, hide loading
    setTimeout(() => {
      loading.style.display = "none"
      main.style.display = "block"
      docsVersion.innerHTML = docsVersionTemp
    }, 600);
  }

  // On error hide loading and clear content 
  catch(error) {
    title.style.animation = "loadingError 5s infinite"
    main.innerHTML = ''
    loading.style.display = "none"
    main.style.display = "block"
    console.error("Error occured: \n" + error)
  }
}

// Change title depending on screen width
if(window.innerWidth < 350) title.innerHTML = "Docs"
window.onresize = () => {
  if(window.innerWidth < 350) title.innerHTML = "Docs"
  else title.innerHTML = "Documentation"
}

// Load animation, from there to provide synchronous movement
setTimeout(() => {
  build()
}, 300);

// Functions from menu items
async function mainDoc(moduleNum) {
  if(subClicked) return
  selectedMenu = moduleNum
  selectedSubMenu = -1
  build()
}
async function subDoc(moduleNum, componentNum) {
  subClicked = true
  selectedMenu = moduleNum
  selectedSubMenu = componentNum
  await build()
  subClicked = false
}