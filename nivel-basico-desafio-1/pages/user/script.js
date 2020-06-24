const main = document.getElementById('main')

// get user from api
async function getUser() {
  let response = await fetch('https://jsonplaceholder.typicode.com/users/1')
  let user = await response.json()
  return user
}
getUser().then(user => fillUI(user))

function generateHTML(user) {
  const content = `
    <img src="../../images/barbara-silva.jpg" alt="Barbara Silva" width="150" height="150">
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

function fillUI(user) {
  const userHTML = generateHTML(user)
  main.innerHTML = userHTML
}