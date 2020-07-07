document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed')
  getUsers()
    .then(res => {
      users = res
      showStatusUndefinedUsers()
    })
})

// get all users from api
async function getUsers() {
  let response = await fetch('http://localhost:3000/users')
  let users = response.json()
  return users
}

let users = []
const headerSearchInput = document.getElementById('header__search__input')
const headerBtn = document.getElementById('header__menu-icon')
const sectionSearch = document.getElementById('section__search')
const userList = document.getElementById('main__list')
const nav = document.getElementById('nav__container')
const navDeleted = document.getElementById('show-deleted')
const navDone = document.getElementById('show-done')
const navAll = document.getElementById('show-all')
const navList = document.getElementById('nav__list')
const navListItems = navList.getElementsByTagName('li')

headerSearchInput.addEventListener('keyup', filterByName)

function filterByName() {
  let contactItems = document.querySelectorAll('.main__list-item-container')
  let filterValue = document.getElementById('header__search__input').value.toUpperCase()

  contactItems.forEach((contact, i) => {
    let name = contact.querySelector('.main__list-item__name span').innerText.toUpperCase()
    let email = contact.querySelector('.main__list-item__email span').innerText.toUpperCase()

    if(name.indexOf(filterValue) > -1 || email.indexOf(filterValue) > -1) {
      contactItems[i].style.display = ''
    } else {
      contactItems[i].style.display = 'none'
    }
  })
}

// when click menu btn, show nav and hide searchbar
headerBtn.addEventListener('click', () => {
  sectionSearch.classList.toggle('section-close')
  nav.classList.toggle('nav-open')
})

// generate template string
function generateHTML(usersToShow) {
  let html = ''
  usersToShow.forEach(user => {
    html += `
      <li class="main__list-item-container" data-id="${user.id}" data-status="all">
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
          <button data-type="btn-delete" class="main__btn--delete" onclick="deleteUser(event)">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button data-type="btn-all" class="main__btn--all" onclick="setStatusToEmpty(event)">
            <i class="far fa-list-alt"></i>
          </button>
          <button data-type="btn-done" class="main__btn--done" onclick="setUserDone(event)">
            <i class="fas fa-check-double"></i>
          </button>
        </div>
    </li>
  `
  })
  return html
}

function render(usersToShow) {
  const usersHTML = generateHTML(usersToShow)
  userList.innerHTML = usersHTML
}

function updateStatusOfVariableUsers(id, statusValue) {
  let filteredUser = users.filter(user => user.id === parseInt(id))
  filteredUser[0].status = statusValue
}

function setStatusToEmpty(event) {
  const e = event || window.event
  const li = e.target.parentNode.parentNode.parentNode
  // hide user
  li.classList.add('main__list-item-container--hide')
  // get id
  const id = li.getAttribute('data-id')
  // update user "status": ""
  patchStatus(`http://localhost:3000/users/${id}`, { status: "" })
  .then(res => {
    updateStatusOfVariableUsers(id, "")
  })
}

function deleteUser(event) {
  const e = event || window.event
  const li = e.target.parentNode.parentNode.parentNode
  // hide user
  li.classList.add('main__list-item-container--hide')
  // get id
  const id = li.getAttribute('data-id')
  // update user "status": deleted
  patchStatus(`http://localhost:3000/users/${id}`, { status: "deleted" })
  .then(res => {
    updateStatusOfVariableUsers(id, "deleted")
  })
}

function setUserDone(event) {
  const e = event || window.event
  const li = e.target.parentNode.parentNode.parentNode
  // hide user
  li.classList.add('main__list-item-container--hide')
  // get id
  const id = li.getAttribute('data-id')
  // update user "status": done
  patchStatus(`http://localhost:3000/users/${id}`, { status: "done" })
  .then(res => {
    updateStatusOfVariableUsers(id, "done")
  })
}

navDeleted.addEventListener('click', showDeletedUsers)
navDone.addEventListener('click', showDoneUsers)
navAll.addEventListener('click', showStatusUndefinedUsers)

function showStatusUndefinedUsers() {
  const statusUndefinedUsers = users.filter(user => user.status === '')
  render(statusUndefinedUsers)
  hideBtnAll()
}

function showDoneUsers() {
  const doneUsers = users.filter(user => user.status === 'done')
  render(doneUsers)
  hideBtnDone()
}

function showDeletedUsers() {
  const deletedUsers = users.filter(user => user.status === 'deleted')
  render(deletedUsers)
  hideBtnDelete()
}

function hideBtnDelete() {
  const deleteBtns = document.querySelectorAll('.main__btn--delete')
  deleteBtns.forEach(btn => btn.style.display = 'none')
}

function hideBtnDone() {
  const doneBtns = document.querySelectorAll('.main__btn--done')
  doneBtns.forEach(btn => btn.style.display = 'none')
}

function hideBtnAll() {
  const allBtns = document.querySelectorAll('.main__btn--all')
  allBtns.forEach(btn => btn.style.display = 'none')
}

// add listener for each list item
for(let i = 0; i < navListItems.length; i++) {
    navListItems[i].addEventListener('click', function() {
      let current = document.getElementsByClassName('nav--active')
      current[0].className = current[0].className.replace('nav--active', '')
      this.className = 'nav--active'
    })
}

async function patchStatus(url, data) {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}