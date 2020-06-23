const nav = document.getElementById('nav__container')
const section_search = document.getElementById('section__search')
const header_btn = document.getElementById('header__menu-icon')

// when click menu btn, show nav and hide searchbar
header_btn.addEventListener('click', () => {
  section_search.classList.toggle('section-close')
  nav.classList.toggle('nav-open')
})

// consume api
async function getUsers() {
  let response = await fetch('https://jsonplaceholder.typicode.com/users')
  let data = await response.json()
  return data
}
getUsers().then(data => console.log(data))