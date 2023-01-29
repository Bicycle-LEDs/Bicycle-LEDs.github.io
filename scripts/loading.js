var loading = document.getElementById("loading")
var main = document.getElementById("mainSection")

if(loading.classList.contains("mainPageLoading")) {
  loading.style.lineHeight = "calc(100vh  - 150px)"
  loading.style.height = "calc(100vh  - 150px)"
  loading.style.animationName = "mainPageLoading"
}


window.onload = function() {
  setTimeout(() => {
    loading.style.display = "none"
    main.style.display = "block"
  }, 500);
}