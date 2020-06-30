const sectionSearch = document.getElementById('section__search')
const headerBtn = document.getElementById('header__menu-icon')
const userList = document.getElementById('main__list')
const headerSearchInput = document.getElementById('header__search__input')
const nav = document.getElementById('nav__container')
const navDeleted = document.getElementById('show-deleted')
const navDone = document.getElementById('show-done')
const navAll = document.getElementById('show-all')
const navList = document.getElementById('nav__list')
const navListItems = navList.getElementsByTagName('li')

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
          <button data-type="btn-delete" class="main__btn--delete">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button data-type="btn-all" class="main__btn--all">
            <i class="far fa-list-alt"></i>
          </button>
          <button data-type="btn-done" class="main__btn--done">
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

/* code for buttons inside each li (start) */ 
userList.addEventListener('click', checkBtnType)

function checkBtnType(e) {
  // STRANGE BEHAVIOR
  const btnType = e.target.parentNode.getAttribute('data-type')
  switch (btnType) {
    case 'btn-delete':
      deleteUser(e)
      break
    case 'btn-done':
      setUserDone(e)
      break
    case 'btn-all':
      showAll()
      break
    default:
      break
  }
}

function deleteUser(e) {
  const li = e.target.parentNode.parentNode.parentNode
  li.setAttribute('data-status', 'deleted')
  li.style.display = 'none'
}

function setUserDone(e) {
  const li = e.target.parentNode.parentNode.parentNode
  li.setAttribute('data-status', 'done')
  li.style.display = 'none'
}

function showAll() {
  const listItemsArr = userList.querySelectorAll('li')
  listItemsArr.forEach(li => {
    li.style.display = ''
  })
}
/* code for buttons inside each li (end) */

/* code for sidenav (start) */
navDeleted.addEventListener('click', showDeletedUsers)
navDone.addEventListener('click', showDoneUsers)
navAll.addEventListener('click', showAllUsers)

function showAllUsers() {
  const listItems = userList.querySelectorAll('li')
  listItems.forEach(li => {
    showListItem(li)
    if(li.getAttribute('data-status') === 'deleted') {
      showDeleteBtnFromListItem(li)
    } else if(li.getAttribute('data-status') === 'done') {
      showDoneBtnFromListItem(li)
    }
  })
}

function showDoneUsers() {
  const listItems = userList.querySelectorAll('li')
  listItems.forEach(li => {
    if(li.getAttribute('data-status') === 'done') {
      showListItem(li)
      hideDoneBtnFromListItem(li)   
    } else {
      hideListItem(li)
    }
  })
}

function showDeletedUsers() {
  const listItems = userList.querySelectorAll('li')
  listItems.forEach(li => {
    if(li.getAttribute('data-status') === 'deleted') {
      showListItem(li)
      hideDeleteBtnFromListItem(li)   
    } else {
      hideListItem(li)
    }
  })
}

function showListItem(li) {
  // show li
  li.style.display = ''
}

function showDeleteBtnFromListItem(li) {
  // show delete btn
  li.querySelector('.main__btn--delete').style.display = ''
}

function hideDeleteBtnFromListItem(li) {
  // hide delete btn
  li.querySelector('.main__btn--delete').style.display = 'none'
}

function showDoneBtnFromListItem(li) {
  // show done btn
  li.querySelector('.main__btn--done').style.display = ''
}

function hideDoneBtnFromListItem(li) {
  // hide done btn
  li.querySelector('.main__btn--done').style.display = 'none'
}

function hideListItem(li) {
  // hide li
  li.style.display = 'none'
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