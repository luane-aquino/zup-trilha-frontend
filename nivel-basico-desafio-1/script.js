const nav = document.getElementById('nav__container')
const sectionSearch = document.getElementById('section__search')
const headerBtn = document.getElementById('header__menu-icon')
const userList = document.getElementById('main__list')

// when click menu btn, show nav and hide searchbar
headerBtn.addEventListener('click', () => {
  sectionSearch.classList.toggle('section-close')
  nav.classList.toggle('nav-open')
})

// consume api
async function getUsers() {
  let response = await fetch('https://jsonplaceholder.typicode.com/users')
  let users = await response.json()
  return users
}
getUsers().then(users => fillUI(users))

// fill ui with user data
function generateHTML(users) {
  let html = ''
  users.forEach(user => {
    html += `
      <li class="main__list-item-container">
        <a href="../user/user.html">
          <img src="../../images/barbara-silva.jpg" alt="picture of Barbara Silva" class="main__list-item__picture">
        </a>
        <a href="../user/user.html" class="main__list-item__name">
          <span>${user.name}</span>
        </a>
        <a href="../user/user.html" class="main__list-item__email">
          <span>${user.email}</span>
        </a>
        <a href="../user/user.html" class="main__list-item__phone">
          <span>${user.phone}</span>
        </a>
        <a href="../user/user.html" class="main__list-item__city">
          <span>${user.address.city}</span>
        </a>
        <div class="main__icons-container">
          <a href="../user/user.html" class="main__list-item__delete">
            <i class="fas fa-trash-alt"></i>
          </a>
          <a href="../user/user.html" class="main__list-item__showall">
            <i class="far fa-list-alt"></i>
          </a>
          <a href="../user/user.html" class="main__list-item__showcompleted">
            <i class="fas fa-check-double"></i>
          </a>
        </div>
    </li>
  `
  })
  return html
}

function fillUI(users) {
  console.log(users)
  const userHTML = generateHTML(users)
  userList.innerHTML = userHTML
}