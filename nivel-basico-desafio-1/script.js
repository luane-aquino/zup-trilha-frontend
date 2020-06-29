const nav = document.getElementById('nav__container')
const sectionSearch = document.getElementById('section__search')
const headerBtn = document.getElementById('header__menu-icon')
const userList = document.getElementById('main__list')
const headerSearchInput = document.getElementById('header__search__input')

/* initialize ui (start) */ 
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed')
  getUsers().then(users => fillUIAllUsers(users))
})

// get all users from api
async function getUsers() {
  let response = await fetch('http://localhost:3000/users')
  let users = await response.json()
  return users
}
/* initialize ui (end) */ 

/* filter by name and email (start) */
headerSearchInput.addEventListener('keyup', filterByName)

function filterByName() {
  console.log('**filter was called')
  let contactItems = document.querySelectorAll('.main__list-item-container')
  let filterValue = document.getElementById('header__search__input').value.toUpperCase()

  contactItems.forEach((contact, i) => {
    let name = contact.querySelector('.main__list-item__name span').innerText.toUpperCase()
    let email = contact.querySelector('.main__list-item__email span').innerText.toUpperCase()

    if(name.indexOf(filterValue) > -1 || email.indexOf(filterValue) > -1) {
      contactItems[i].style.display = ''
      // contactItems[i].classList.remove('main__list-item--hide')
    } else {
      contactItems[i].style.display = 'none'
      // contactItems[i].classList.add('main__list-item--hide')
    }
  })
}
/* filter by name and email (end) */

/* handle hamburger menu (start) */ 
// when click menu btn, show nav and hide searchbar
headerBtn.addEventListener('click', () => {
  sectionSearch.classList.toggle('section-close')
  nav.classList.toggle('nav-open')
})
/* handle hamburger menu (end) */ 

/* fill ui with user data from api (start) */
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
          <button class="main__btn--delete">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button class="main__btn--showall">
            <i class="far fa-list-alt"></i>
          </button>
          <button class="main__btn--completed">
            <i class="fas fa-check-double"></i>
          </button>
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
/* fill ui with user data from api (end) */

/* delete user from list of contacts (start) */ 
userList.addEventListener('click', deleteUser)

function deleteUser(e) {
  const li = e.target.parentNode.parentNode.parentNode
  li.setAttribute('data-status', 'deleted')
  li.style.display = 'none'
}
/* delete user from list of contacts (end) */ 