// <-- Navigator -->

var navLinks = document.getElementById("navLinks")
function showMenu() {
  navLinks.style.right = "0"
}
function hideMenu() {
  navLinks.style.right = "-140px"
}

// <-- Loading animation -->

var loading = document.getElementById("loading")
var main = document.getElementById("mainSection")

if(loading.classList.contains("mainPageLoading")) {
    loading.style.lineHeight = "80vh"
    loading.style.height = "100vh"
}

// Animation load
setTimeout(() => {
  loading.innerHTML = '<i class="fa-solid fa-spinner" id="emojiInLoading"></i> Loading'
  var emojiInLoading = document.getElementById("emojiInLoading")
  emojiInLoading.style.animation = "spinner 0.5s infinite"
  if (loading.classList.contains("mainPageLoading")) loading.style.animation = "mainPageLoading 2s infinite"
  else if(window.innerHeight < 735 && window.innerWidth > 700) loading.style.animation = "loadingWithoutFly 2s infinite"
  else loading.style.animation = "loading 2s infinite"
}, 300);

// Remove loading screen
window.onload = function() {
  setTimeout(() => {
    loading.style.display = "none"
    main.style.display = "block"
  }, 1000);
}


// <-- Announcment -->
var globalAnnouncment = ''

var mainAnnouncment = '',
    aboutAnnouncment = '',
    docsAnnouncment = '<i class="fa-solid fa-microchip"></i> Docs - work in progress <i class="fa-solid fa-wrench"></i>'

var fileName = location.href.split("/").slice(-1), text;

var announcment = document.getElementById("announcment")
if(fileName[0] == 'docs.html') text = docsAnnouncment
else if (fileName[0] == 'about.html') text = aboutAnnouncment
else if (fileName[0] == 'index.html') text = mainAnnouncment
text ? (globalAnnouncment ? text = text + '<br />' + globalAnnouncment : text = text) : (globalAnnouncment ? text = globalAnnouncment : text = '')
announcment.innerHTML =  text


// <-- Reloader -->

function reload() {
  location.reload(true);
}