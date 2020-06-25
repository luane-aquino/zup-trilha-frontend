const main = document.getElementById('main')

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});

// function nonameyet(id) {
//   console.log('**in another page')
//   location.replace('./pages/user/user.html')
  
//   // getUser(id).then(user => console.log('***user ', user))
//   // getUser(id).then(user => fillUIOneUser(user))
// }

// get user from api
async function getUser(userId) {
  let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  let user = await response.json()
  return user
}
// getUser().then(user => fillUI(user))

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

function fillUIOneUser(user) {
  const userHTML = generateHTML(user)
  main.innerHTML = userHTML
}