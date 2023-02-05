// Check version number
async function versionNum() {
  var versionNum = document.getElementById("version")
  try {
    const number = await fetch("../version.txt")
    if(number.ok) versionNum.innerHTML = versionNum.innerHTML + ' v' + await number.text()
  }
  catch (error) {
    versionNum.innerHTML = versionNum.innerHTML + ' Testing env'
  }
}
versionNum()

// Here paste announcments
const globalAnnouncment = ''

const mainAnnouncment = '',
    aboutAnnouncment = '<i class="fa-solid fa-wrench"></i> Not finished',
    reposAnnouncment = '<i class="fa-solid fa-screwdriver-wrench"></i> Work in progress'
    docsAnnouncment = '<i class="fa-solid fa-microchip"></i> Database not ready'

// Check what's name of page and fetch html element
const fileName = location.href.split("/").slice(-1); 
const announcment = document.getElementById("announcment")
let text;

// Create text depending on filename
if(fileName[0] == 'docs.html') text = docsAnnouncment
else if (fileName[0] == 'about.html') text = aboutAnnouncment
else if (fileName[0] == 'repos.html') text = reposAnnouncment
else if (fileName[0] == 'index.html') text = mainAnnouncment
text ? (globalAnnouncment ? text = text + '<br />' + globalAnnouncment : text = text) : (globalAnnouncment ? text = globalAnnouncment : text = '')
announcment.innerHTML =  text

// Navigator, on show show, on hide hide
const navLinks = document.getElementById("navLinks")
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

// Change anim style
const anims = [
  { a: "solid", b: "sync" },
  { a: "solid", b: "circle-notch" },
  { a: "solid", b: "spinner" },
  { a: "solid", b: "gear" },
  { a: "solid", b: "compact-disc" }
]
let lastAnim, anim
function changeAnim() {
  while(lastAnim == anim) anim = anims[Math.floor(Math.random()*anims.length)];
  const loading = document.getElementById("loading")
  loading.innerHTML = `<i class="fa-${anim.a} fa-${anim.b}" id="emojiInLoading"></i> Loading`
  const emojiInLoading = document.getElementById("emojiInLoading")
  emojiInLoading.style.animation = "spinner 0.5s infinite"
  loading.style.animation = "loading 2s infinite"
  lastAnim = anim
}