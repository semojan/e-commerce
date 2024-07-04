const menuE = document.getElementById("mobile-menu");
const btnE = document.getElementById("mobile-btn");

btnE.onclick = function() {
    menuE.classList.toggle("open");
};