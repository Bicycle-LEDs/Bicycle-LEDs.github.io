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
      <div class="box">
        <div class="info">
          <h1><span class="p">Bicycle-LEDs/</span>${repos[i].name}</h1>
    
          <h2>${repos[i].description}</h2>

          <p class="issues"><i class="fa-solid fa-circle-info"></i> Open issues: ${repos[i].open_issues}</p>
        </div>
        
        <div class="branch-ctrl" id="branches-${i}"> </div>

        <div class="branch-info" id="branchInfo-${i}"> </div>

        <a href="${repos[i].html_url}" target="_blank"><i class="repoBtn fa-solid fa-chevron-right"></i></a>
      </div>`

      // Get branches list
      let branches = await fetch(repos[i].branches_url.replace('{/branch}', '')).then(res => res.json())
      let branchesHtml = document.getElementById(`branches-${i}`)

      for (let k = branches.length - 1; k >= 0; k--) {
        if(branches[k].name == repos[i].default_branch) branchesHtml.innerHTML = branchesHtml.innerHTML + `<p class="active-branch" id="branch-${i}${k}" onclick="changeBranch(${i}, ${k})"><i class="fa-solid fa-code-branch"></i>${branches[k].name}</p>`
        else branchesHtml.innerHTML = branchesHtml.innerHTML + `<p class="branch" id="branch-${i}${k}" onclick="changeBranch(${i}, ${k})"><i class="fa-solid fa-code-branch"></i>${branches[k].name}</p>`
      }
    }

    // Show page again, hide loading
    setTimeout(() => {
      loading.style.display = "none"
      main.style.display = "block"
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

async function changeBranch(repoNum, branchNum) {

  try {
    
    let branchInfoHtml = document.getElementById(`branchInfo-${repoNum}`)
    branchInfoHtml.innerHTML = '<p class="loading"><i class="fa-brands fa-github fa-flip"></i> Loading</p>'

    // Remove active class from this branch
    let branchesCount = document.getElementById(`branches-${repoNum}`).childElementCount
    for (let h = 0; h < branchesCount; h++) {
      document.getElementById(`branch-${repoNum}${h}`).classList.remove('active-branch')
      document.getElementById(`branch-${repoNum}${h}`).classList.add('branch')
    }

    // Get branch info
    let repos = await fetch('https://api.github.com/users/Bicycle-Leds/repos').then(res => res.json())
    let repo = repos[repoNum]
    let branches = await fetch(repo.branches_url.replace('{/branch}', '')).then(res => res.json())
    let branchInfo = branches[branchNum]

    let branchHtml = document.getElementById(`branch-${repoNum}${branchNum}`)

    branchHtml.classList.add("active-branch")
    branchHtml.classList.remove("branch")

  }

  catch (error) {
    title.style.animation = "loadingError 5s infinite"
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