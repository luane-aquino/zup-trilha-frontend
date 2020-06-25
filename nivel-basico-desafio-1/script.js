const nav = document.getElementById('nav__container')
const sectionSearch = document.getElementById('section__search')
const headerBtn = document.getElementById('header__menu-icon')
const userList = document.getElementById('main__list')

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed')
  getUsers().then(users => fillUIAllUsers(users))
})

// when click menu btn, show nav and hide searchbar
headerBtn.addEventListener('click', () => {
  sectionSearch.classList.toggle('section-close')
  nav.classList.toggle('nav-open')
})

// get all users from api
async function getUsers() {
  let response = await fetch('http://localhost:3000/users')
  let users = await response.json()
  return users
}

// fill ui with user data
function generateHTMLAllUsers(users) {
  let html = ''
  users.forEach(user => {
    html += `
      <li class="main__list-item-container" data-id="${user.id}">
        <a href="pages/user/user.html?id=${user.id}">
          <img src="${user.picture}" alt="${user.name}" class="main__list-item__picture">
        </a>
        <a href="pages/user/user.html?id=${user.id}" class="main__list-item__name">
          <span>${user.name}</span>
        </a>
        <a href="pages/user/user.html?id=${user.id}" class="main__list-item__email">
          <span>${user.email}</span>
        </a>
        <a href="pages/user/user.html?id=${user.id}" class="main__list-item__phone">
          <span>${user.phone}</span>
        </a>
        <a href="pages/user/user.html?id=${user.id}" class="main__list-item__city">
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

function fillUIAllUsers(users) {
  const usersHTML = generateHTMLAllUsers(users)
  userList.innerHTML = usersHTML
}