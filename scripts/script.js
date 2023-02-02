// Check version number
async function versionNum() {
  var versionNum = document.getElementById("version")
  let versionNumLink = "../version.txt"
  try {
    let number = await fetch(versionNumLink)
    if(number.ok) versionNum.innerHTML = versionNum.innerHTML + ' v' + await number.text()
  }
  catch (error) {
    versionNum.innerHTML = versionNum.innerHTML + ' Testing env'
  }
}
versionNum()

// Here paste announcments
var globalAnnouncment = ''

var mainAnnouncment = '',
    aboutAnnouncment = '<i class="fa-solid fa-wrench"></i> Not finished',
    reposAnnouncment = '<i class="fa-solid fa-screwdriver-wrench"></i> Work in progress'
    docsAnnouncment = '<i class="fa-solid fa-microchip"></i> Database not ready'

// Check what's name of page and fetch html element
var fileName = location.href.split("/").slice(-1), text;
var announcment = document.getElementById("announcment")

// Create text depending on filename
if(fileName[0] == 'docs.html') text = docsAnnouncment
else if (fileName[0] == 'about.html') text = aboutAnnouncment
else if (fileName[0] == 'repos.html') text = reposAnnouncment
else if (fileName[0] == 'index.html') text = mainAnnouncment
text ? (globalAnnouncment ? text = text + '<br />' + globalAnnouncment : text = text) : (globalAnnouncment ? text = globalAnnouncment : text = '')
announcment.innerHTML =  text

// Navigator, on show show, on hide hide
var navLinks = document.getElementById("navLinks")
function showMenu() {
  navLinks.style.right = "0"
}
function hideMenu() {
  navLinks.style.right = "-140px"
}

// On click reload
function reload() {
  window.location = window.location
}