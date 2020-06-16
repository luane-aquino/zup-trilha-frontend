const sidenav = document.getElementById("sidenav__container")
const main = document.getElementById("main__container")
const header = document.getElementById("header__container")
const header_logo = document.getElementById('header__logo')

function openSidenav() {
  sidenav.classList.add("sidenav__open")
}

main.addEventListener("click", () => {
  sidenav.classList.remove("sidenav__open")
})

header_logo.addEventListener("click", () => {
  sidenav.classList.remove("sidenav__open")
})