// Get document elements
const loading = document.getElementById("loading")
const main = document.getElementById("mainSection")
const grid = document.getElementById("grid")
const title = document.getElementById("title")
let repos

async function build() {
  
  // Hide page, show loading
  loading.style.display = "block"
  main.style.display = "none"

  try {

    // Get repos list
    repos = await fetch('https://api.github.com/users/Bicycle-Leds/repos').then(res => res.json())

    for(let i = 0; i < repos.length; i++) {

      if(repos[i].name.includes(".github.io")) repos[i].name = "website"
      grid.innerHTML = grid.innerHTML + `
      <div class="box">
        <div class="info">
          <h1><span class="p">Bicycle-LEDs/</span>${repos[i].name}</h1>
    
          <h2>${repos[i].description}</h2>

          <p class="issues"><i class="fa-solid fa-circle-info"></i> Issues: ${repos[i].open_issues}</p>
        </div>
        
        <div class="branch-ctrl" id="branches-${i}"> </div>

        <p class="loading" id="loadingBranch-${i}"><i class="fa-brands fa-github fa-flip"></i></p>
        <div class="branch-info" id="branchInfo-${i}"></div>

        <a target="_blank" class="repoBtn" id="mainBtn-${i}"><i class="fa-solid fa-chevron-right"></i></a>
      </div>`

      // Get branches list
      const branches = await fetch(repos[i].branches_url.replace('{/branch}', '')).then(res => res.json())
      const branchesHtml = document.getElementById(`branches-${i}`)

      // List branches
      for (let k = branches.length - 1; k >= 0; k--) {
        if(branches[k].name == repos[i].default_branch) branchesHtml.innerHTML = branchesHtml.innerHTML + `<p class="active-branch" id="branch-${i}${k}" onclick="changeBranch(${i}, ${k})"><i class="fa-solid fa-code-branch"></i> ${branches[k].name}</p>`
        else branchesHtml.innerHTML = branchesHtml.innerHTML + `<p class="branch" id="branch-${i}${k}" onclick="changeBranch(${i}, ${k})"><i class="fa-solid fa-code-branch"></i> ${branches[k].name}</p>`
      }

      // Add commit info
      const branchInfoHtml = document.getElementById(`branchInfo-${i}`)
      for (let l = 0; l < branches.length; l++) {
        if(branches[l].name == repos[i].default_branch) {
          const commitInfo = await fetch(branches[l].commit.url).then(res => res.json())
          const commitDate = new Date(commitInfo.commit.committer.date).toLocaleString(navigator.language, {hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric"});
          branchInfoHtml.innerHTML = `
          <img class="av" src="${commitInfo.committer.avatar_url}"><p class="commInfo"><span class="commSha"><i><i class="fa-solid fa-code-commit"></i> ${commitInfo.sha.substring(0, 7)}</span></i> | <b>${commitDate}</b> | <i>by: <b>${commitInfo.commit.committer.name}</b></i></p>
          <br>
            <h1>${commitInfo.commit.message}</h1>
          `
        }
      }

      // Set button as link or as function
      const button = document.getElementById(`mainBtn-${i}`)
      if(window.innerWidth > 700) button.setAttribute('href', repos[i].html_url)
      else button.setAttribute('onclick', `displayMobileSubMenu(${i})`)
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
  const loadingBranch = document.getElementById(`loadingBranch-${repoNum}`)
  if(loadingBranch.style.visibility == "visible") return;
  try {
    loadingBranch.style.visibility = "visible"

    // Remove active class from this branch
    const branchesCount = document.getElementById(`branches-${repoNum}`).childElementCount
    for (let h = 0; h < branchesCount; h++) {
      document.getElementById(`branch-${repoNum}${h}`).classList.remove('active-branch')
      document.getElementById(`branch-${repoNum}${h}`).classList.add('branch')
    }

    // Get branch info
    repos = await fetch('https://api.github.com/users/Bicycle-Leds/repos').then(res => res.json())
    const branches = await fetch(repos[repoNum].branches_url.replace('{/branch}', '')).then(res => res.json())
    const commitInfo = await fetch(branches[branchNum].commit.url).then(res => res.json())

    setTimeout(() => {

      const branchInfoHtml = document.getElementById(`branchInfo-${repoNum}`)
      const commitDate = new Date(commitInfo.commit.committer.date).toLocaleString(navigator.language, {hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric"});
      branchInfoHtml.innerHTML = `
      <img class="av" src="${commitInfo.committer.avatar_url}"><p class="commInfo"><span class="commSha"><i class="fa-solid fa-code-commit"></i> ${commitInfo.sha.substring(0, 7)}</span> | <b>${commitDate}</b> by: <b>${commitInfo.commit.committer.name}</b></p>
      <br>
        <h1>${commitInfo.commit.message}</h1>
        `

      loadingBranch.style.visibility = "hidden"

      const branchHtml = document.getElementById(`branch-${repoNum}${branchNum}`)
      branchHtml.classList.add("active-branch")
      branchHtml.classList.remove("branch")

    }, 500);
  }

  catch (error) {
    title.style.animation = "loadingError 5s infinite"
    console.error("Error occured: \n" + error)
  }
}

async function displayMobileSubMenu(repoNum) {
  const button = document.getElementById(`mainBtn-${repoNum}`)

  // Rotate button
  if(button.style.rotate == '-90deg') button.style.rotate = ''
  else button.style.rotate = '-90deg'

  /*
  ------------
  --- TODO ---
  ------------
  */
}

// Change title and button behavior depending on screen width
if(window.innerWidth < 350) title.innerHTML = "Repos"
window.onresize = () => {
  if(window.innerWidth < 350) title.innerHTML = "Repos"
  else title.innerHTML = "Repositories"

  try {
    if(window.innerWidth < 700) {
      for (let i = 0; i < repos.length; i++) {
        const button = document.getElementById(`mainBtn-${i}`)
        button.removeAttribute('href')
        button.setAttribute('onclick', `displayMobileSubMenu(${i})`)
      }
    }
    else {
      for (let i = 0; i < repos.length; i++) {
        const button = document.getElementById(`mainBtn-${i}`)
        button.setAttribute('href', repos[i].html_url)
        button.removeAttribute('onclick')
      }
    }
  }
  catch (error) {}
}

// Load animation, from there to provide synchronous movement
setTimeout(() => {
  changeAnim()
  build()
}, 300);