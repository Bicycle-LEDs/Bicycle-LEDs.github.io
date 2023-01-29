// <-- Loading animation -->

var loading = document.getElementById("loading")
var main = document.getElementById("mainSection")
var loadingAnim = true

loading.innerHTML = '<i class="fa-solid fa-spinner" id="emojiInLoading"></i> Loading'

if(loading.classList.contains("mainPageLoading")) {
  loading.style.lineHeight = "80vh"
  loading.style.height = "100vh"
  loading.style.animationName = "mainPageLoading"
}

function error() {
  setTimeout(() => {
    loading.style.animationDelay = "0s"
    loading.style.animation = "loadingError 2s infinite"
    loading.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error'
    var announcment = document.getElementById("announcment")
    announcment.innerHTML = announcment.innerHTML + '<br />' + '<i class="fa-solid fa-bug"></i> Loading errors occured'
    var title = document.getElementById("title")
    title.style.animation = "loadingError 2s infinite"
    setTimeout(() => {
      loading.style.display = "none"
      main.style.display = "block"
      loading.style.animation = "loading 2s infinite"
      loading.innerHTML = '<i class="fa-solid fa-spinner" id="emojiInLoading"></i> Loading'
      var emojiInLoading = document.getElementById("emojiInLoading")
      emojiInLoading.style.animationDelay = "0s"
    }, loadingAnim ? 2500 : 1);
  }, loadingAnim ? 2000 : 1)
}

window.onload = function() {
  setTimeout(() => {
    var emojiInLoading = document.getElementById("emojiInLoading")
    emojiInLoading.style.animationDelay = "0s"
    if(loading.classList.contains("e")) {
      error()
      return
    }
    loading.style.display = "none"
    main.style.display = "block"
  }, loadingAnim ? 1000 : 1);
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
  location.reload(true);
}