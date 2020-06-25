const main = document.getElementById('main')

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed')
  const id = getId()
  getUser(id).then(user => {
    fillUIOneUser(user)
  })
})

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

function generateHTMLOneUser(user) {
  const content = `
    <img src="${user.picture}" alt="Barbara Silva" width="150" height="150">
    <span class="main__title">Hi, My name is</span>
    <span class="main__info">${user.name}</span>
    <div class="main__icons">
      <i class="far fa-user"></i>
      <i class="far fa-envelope"></i>
      <i class="far fa-calendar-alt"></i>
      <i class="far fa-map"></i>
      <i class="fas fa-phone-volume"></i>
      <i class="fas fa-key"></i>
    </div>
  `
  return content
}

function fillUIOneUser(user) {
  const userHTML = generateHTMLOneUser(user)
  main.innerHTML = userHTML
}