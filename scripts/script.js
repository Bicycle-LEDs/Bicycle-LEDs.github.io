// <-- Version num -->
async function versionNum() {
  var versionNum = document.getElementById("version")
  let versionNumLink = "https://raw.githubusercontent.com/Bicycle-LEDs/Bicycle-LEDs.github.io/main/version.txt"
  let number = await fetch(versionNumLink)
  if(number.ok) versionNum.innerHTML = versionNum.innerHTML + ' v' + await number.text()
}

versionNum()

// <-- Announcment -->

var globalAnnouncment = ''

var mainAnnouncment = '',
    aboutAnnouncment = '<i class="fa-solid fa-wrench"></i> Work in progress',
    docsAnnouncment = '<i class="fa-solid fa-microchip"></i> Work in progress'

var fileName = location.href.split("/").slice(-1), text;

var announcment = document.getElementById("announcment")
if(fileName[0] == 'docs.html') text = docsAnnouncment
else if (fileName[0] == 'about.html') text = aboutAnnouncment
else if (fileName[0] == 'index.html') text = mainAnnouncment
text ? (globalAnnouncment ? text = text + '<br />' + globalAnnouncment : text = text) : (globalAnnouncment ? text = globalAnnouncment : text = '')
announcment.innerHTML =  text

// <-- Navigator -->

var navLinks = document.getElementById("navLinks")
function showMenu() {
  navLinks.style.right = "0"
}
function hideMenu() {
  navLinks.style.right = "-140px"
}

// <-- Reloader -->

function reload() {
  window.location = window.location.href + "?eraseCache=true"
}