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
  else loading.style.animation = "loading 2s infinite"
}, 300);

// Remove loading screen
window.onload = function() {
  setTimeout(() => {
    loading.style.display = "none"
    main.style.display = "block"
  }, 1000);
}