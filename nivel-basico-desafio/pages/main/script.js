/* initialize ui (start) */ 
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed')
  getUsers()
    .then(res => {
      users = res
      fillUIAllUsers()
    })
})

// get all users from api
async function getUsers() {
  console.log('*fetchfetch GET users')
  let response = await fetch('http://localhost:3000/users')
  let users = await response.json()
  return users
}
/* initialize ui (end) */

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
    } else {
      contactItems[i].style.display = 'none'
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
function render(users) {
  let html = ''
  users.forEach(user => {
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
          <button data-type="btn-all" class="main__btn--all" onclick="showAll(event)">
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

function fillUIAllUsers() {
  const usersHTML = render(users)
  userList.innerHTML = usersHTML
}
/* fill ui with user data from api (end) */

/* code for buttons inside each li (start) */
// function initializeButtons() {
//   // loop usuarios
//   // para cada li/item add listener to 3 btns
//   const items = document.querySelectorAll('.main__list-item-container')
//   items.forEach(item => {
//     const btnDelete = item.querySelector('.main__btn--delete')
//     btnDelete.addEventListener('click', deleteUser)

//     const btnAll = item.querySelector('.main__btn--all')
//     btnAll.addEventListener('click', showAll)

//     const btnDone = item.querySelector('.main__btn--done')
//     btnDone.addEventListener('click', setUserDone)
//   })
// }

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

function updateStatusOfVariableUsers(id, statusValue) {
  let filteredUser = users.filter(user => user.id === parseInt(id))
  filteredUser[0].status = statusValue
}

function setUserDone(e) {
  const li = e.target.parentNode.parentNode.parentNode
  // const btnDoneIcon = li.querySelector('.main__btn--done')
  // btnDeleteIcon.classList.add('main__btn--red')
  // get id
  const id = li.getAttribute('data-id')
  // debugger
  // update user "status": done
  patchStatus(`http://localhost:3000/users/${id}`, { status: "done" })
  .then(data => {
    console.log(data)
  })
}

function showAll(e) {
  const li = e.target.parentNode.parentNode.parentNode
  // const btnDeleteIcon = li.querySelector('.main__btn--delete')
  // btnDeleteIcon.classList.add('main__btn--red')
  // get id
  const id = li.getAttribute('data-id')
  // debugger
  // update user "status": deleted
  patchStatus(`http://localhost:3000/users/${id}`, { status: "" })
  .then(data => {
    console.log(data)
  })
}
/* code for buttons inside each li (end) */

/* code for sidenav (start) */
navDeleted.addEventListener('click', showDeletedUsers)
navDone.addEventListener('click', showDoneUsers)
navAll.addEventListener('click', showAllUsers)

function showAllUsers() {
  getUsers()
    .then(users => fillUIAllUsers(users))
    // .finally(initializeButtons)
}

function showDoneUsers() {
  getUsers()
  .then(allUsers => {
    return filterDoneUsers(allUsers)
  })
  .then(doneUsers => {
    // debugger
    fillUIAllUsers(doneUsers)
  })
  .finally(() => {
    // initializeButtons()
    hideBtnDone()
  })
}

function showDeletedUsers() {
  getUsers()
    .then(allUsers => {
      return filterDeletedUsers(allUsers)
    })
    .then(deletedUsers => {
      // debugger
      fillUIAllUsers(deletedUsers)
    })
    .finally(() => {
      // initializeButtons()
      hideBtnDelete()
    })
}

function filterDeletedUsers(users) {
  const deletedUsers = users.filter(user => user.status === 'deleted')
  return deletedUsers
}

function filterDoneUsers(users) {
  return users.filter(user => user.status === 'done')
}

function hideBtnDelete() {
  const deleteBtns = document.querySelectorAll('.main__btn--delete')
  // debugger
  deleteBtns.forEach(btn => btn.style.display = 'none')
}

function hideBtnDone() {
  const doneBtns = document.querySelectorAll('.main__btn--done')
  // debugger
  doneBtns.forEach(btn => btn.style.display = 'none')
}
/* code for sidenav (end) */

/* add active class to current element in sidenav (start) */
// add listener for each list item
for(let i = 0; i < navListItems.length; i++) {
    navListItems[i].addEventListener('click', function() {
      let current = document.getElementsByClassName('nav--active')
      current[0].className = current[0].className.replace('nav--active', '')
      this.className = 'nav--active'
    })
}
/* add active class to current element in sidenav (end) */

/* patch request (start) */
async function patchStatus(url, data) {
  console.log('*fetch PATCH')
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
  // window.stop()
}
/* patch request (end) */