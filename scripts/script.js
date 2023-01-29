var globalAnnouncment = ''

var mainAnnouncment = '',
    aboutAnnouncment = '',
    docsAnnouncment = '<i class="fa-solid fa-microchip"></i> Docs - work in progress <i class="fa-solid fa-wrench"></i>'

var fileName = location.href.split("/").slice(-1), text;

setInterval(() => {
  var announcment = document.getElementById("announcment")
  var today = new Date();
  var time = today.getHours() + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 9 ? "0" + today.getSeconds() : today.getSeconds());// <-- Announcment -->
  timeAnnouncment = globalAnnouncment ? globalAnnouncment + " | " + time : time
  if(fileName[0] == 'docs.html') text = docsAnnouncment
  else if (fileName[0] == 'about.html') text = aboutAnnouncment
  else if (fileName[0] == 'index.html') text = mainAnnouncment
  text ? (timeAnnouncment ? text = text + '<br />' + timeAnnouncment : text = text) : (timeAnnouncment ? text = timeAnnouncment : text = '')
  textToDeliver = announcment.classList.contains("e") ? text + '<br />' + '<i class="fa-solid fa-bug"></i> Loading errors occured' : text
  announcment.innerHTML =  textToDeliver
}, 100)


// <-- Navigator -->

var navLinks = document.getElementById("navLinks")
function showMenu() {
  navLinks.style.right = "0"
}
function hideMenu() {
  navLinks.style.right = "-140px"
}

function reload() {
  location.reload(true);
}


// <-- Loading animation -->

var loading = document.getElementById("loading")
var main = document.getElementById("mainSection")

if(loading.classList.contains("mainPageLoading")) {
  loading.style.lineHeight = "80vh"
  loading.style.height = "100vh"
  loading.style.animationName = "mainPageLoading"
}

function error() {
  setTimeout(() => {
    loading.style.animation = "loadingError 2s infinite"
    loading.style.animationDelay = "0s"
    loading.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error'
    var announcment = document.getElementById("announcment")
    announcment.classList.add("e")
    var title = document.getElementById("title")
    title.style.animation = "loadingError 2s infinite"
    setTimeout(() => {
      loading.style.display = "none"
      main.style.display = "block"
    }, 2500);
  }, 2000)
}

window.onload = function() {
  setTimeout(() => {
    if(loading.classList.contains("e")) {
      error()
      return
    }
    loading.style.display = "none"
    main.style.display = "block"
  }, 1000);
}