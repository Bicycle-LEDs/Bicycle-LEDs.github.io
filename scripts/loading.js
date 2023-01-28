var loading = document.getElementById("loading");
var main = document.getElementById("mainSection");

window.onload = function() {
  setTimeout(() => {
    loading.style.display = "none"
    main.style.display = "block"
  }, 1500);
}