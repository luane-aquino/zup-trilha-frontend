document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed')
  const id = getId()
  getUser(id).then(userData => {
    user = userData
    setUserPicture()
    showUserName()
  })
})

let user = ''
const main = document.getElementById('main')
const mainTitle = document.getElementById('main__title')
const mainInfo = document.getElementById('main__info')
const mainIconsName = document.getElementById('main__icons__name')
const mainIconsEmail = document.getElementById('main__icons__email')
const mainIconsTelephone = document.getElementById('main__icons__telephone')
const mainIconsBirthday = document.getElementById('main__icons__birthday')
const mainIconsLocation = document.getElementById('main__icons__location')
const mainIconsPassword = document.getElementById('main__icons__password')

mainIconsName.addEventListener('mouseover', showUserName)
mainIconsEmail.addEventListener('mouseover', showUserEmail)
mainIconsTelephone.addEventListener('mouseover', showUserTelephone)
mainIconsBirthday.addEventListener('mouseover', showUserBirthday)
mainIconsLocation.addEventListener('mouseover', showUserLocation)
mainIconsPassword.addEventListener('mouseover', showUserPassword)

function setUserPicture() {
  const userPicture = document.querySelector('#main img')
  userPicture.setAttribute('src', user.picture)
  userPicture.setAttribute('alt', user.name)
}

function showUserName() {
  mainTitle.innerText = 'My name is'
  mainInfo.innerText = user.name
  //set color when icon is active
  mainIconsName.classList.add('main__icons-active')
  //reset color of other icons
  mainIconsEmail.classList.remove('main__icons-active')
  mainIconsTelephone.classList.remove('main__icons-active')
  mainIconsBirthday.classList.remove('main__icons-active')
  mainIconsLocation.classList.remove('main__icons-active')
  mainIconsPassword.classList.remove('main__icons-active')
}

function showUserEmail() {
  mainTitle.innerText = 'My email is'
  mainInfo.innerText = user.email
  //set color when icon is active
  mainIconsEmail.classList.add('main__icons-active')
  //reset color of other icons
  mainIconsName.classList.remove('main__icons-active')
  mainIconsTelephone.classList.remove('main__icons-active')
  mainIconsBirthday.classList.remove('main__icons-active')
  mainIconsLocation.classList.remove('main__icons-active')
  mainIconsPassword.classList.remove('main__icons-active')
}

function showUserTelephone() {
  mainTitle.innerText = 'My phone is'
  mainInfo.innerText = user.phone
  //set color when icon is active
  mainIconsTelephone.classList.add('main__icons-active')
  //reset color of other icons
  mainIconsEmail.classList.remove('main__icons-active')
  mainIconsName.classList.remove('main__icons-active')
  mainIconsBirthday.classList.remove('main__icons-active')
  mainIconsLocation.classList.remove('main__icons-active')
  mainIconsPassword.classList.remove('main__icons-active')
}

function showUserBirthday() {
  mainTitle.innerText = 'My birthday is'
  mainInfo.innerText = user.birthday
  //set color when icon is active
  mainIconsBirthday.classList.add('main__icons-active')
  //reset color of other icons
  mainIconsName.classList.remove('main__icons-active')
  mainIconsEmail.classList.remove('main__icons-active')
  mainIconsTelephone.classList.remove('main__icons-active')
  mainIconsLocation.classList.remove('main__icons-active')
  mainIconsPassword.classList.remove('main__icons-active')
}

function showUserLocation() {
  mainTitle.innerText = 'My location is'
  mainInfo.innerText = user.address.city
  //set color when icon is active
  mainIconsLocation.classList.add('main__icons-active')
  //reset color of other icons
  mainIconsName.classList.remove('main__icons-active')
  mainIconsEmail.classList.remove('main__icons-active')
  mainIconsTelephone.classList.remove('main__icons-active')
  mainIconsBirthday.classList.remove('main__icons-active')
  mainIconsPassword.classList.remove('main__icons-active')
}

function showUserPassword() {
  mainTitle.innerText = 'My password is'
  mainInfo.innerText = user.password
  //set color when icon is active
  mainIconsPassword.classList.add('main__icons-active')
  //reset color of other icons
  mainIconsName.classList.remove('main__icons-active')
  mainIconsEmail.classList.remove('main__icons-active')
  mainIconsTelephone.classList.remove('main__icons-active')
  mainIconsBirthday.classList.remove('main__icons-active')
  mainIconsLocation.classList.remove('main__icons-active')
}

//get id from query parameter
function getId() {
  const params = new URLSearchParams(document.location.search.substring(1))
  const id = params.get('id')
  return id
}

// get user from api
async function getUser(userId) {
  let response = await fetch(`http://localhost:3000/users/${userId}`)
  let user = await response.json()
  return user
}

// function generateHTMLOneUser(user) {
//   const content = `
//     <img src="${user.picture}" alt="${user.name}">
//     <span class="main__title">Hi, My name is</span>
//     <span class="main__info">${user.name}</span>
//     <div class="main__icons">
//       <i class="far fa-user"></i>
//       <i class="far fa-envelope"></i>
//       <i class="far fa-calendar-alt"></i>
//       <i class="far fa-map"></i>
//       <i class="fas fa-phone-volume"></i>
//       <i class="fas fa-key"></i>
//     </div>
//   `
//   return content
// }

// function fillUIOneUser(user) {
//   const userHTML = generateHTMLOneUser(user)
//   main.innerHTML = userHTML
// }