// Get document elements
var loading = document.getElementById("loading")
var main = document.getElementById("mainSection")
var grid = document.getElementById("grid")
var title = document.getElementById("title")

async function build() {
  
  // Hide page, show loading
  loading.style.display = "block"
  main.style.display = "none"

  try {

    // Get repos list
    let repos = await fetch('https://api.github.com/users/Bicycle-Leds/repos').then(res => res.json())

    for(let i = 0; i < repos.length; i++) {

      if(repos[i].name.includes(".github.io")) repos[i].name = "website"
      grid.innerHTML = grid.innerHTML + `
      <a href="${repos[i].html_url}" target="_blank"><div class="box">

        <h1><span class="p">Bicycle-LEDs/ </span>${repos[i].name}</h1>

      </div></a>`

    }

    // Show page again, hide loading
    setTimeout(() => {
      loading.style.display = "none"
      main.style.display = "block"

      // Temp
      title.style.animation = "loadingError 5s infinite"
    }, 600);

  }

  // On error hide loading and clear content 
  catch (error) {
    title.style.animation = "loadingError 5s infinite"
    main.innerHTML = ''
    loading.style.display = "none"
    main.style.display = "block"
    console.error("Error occured: \n" + error)
  }

}

// Change title depending on screen width
if(window.innerWidth < 350) title.innerHTML = "Repos"
window.onresize = () => {
  if(window.innerWidth < 350) title.innerHTML = "Repos"
  else title.innerHTML = "Repositories"
}

// Load animation, from there to provide synchronous movement
setTimeout(() => {
  changeAnim()
  build()
}, 300);