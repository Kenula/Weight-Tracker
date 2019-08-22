//Retrieves the current user's name
async function getUser() {
  const response = await fetch('/user');
  const user = await response.json();
  const userName = user.user;
  console.log(user);
  document.getElementById('greet').innerText = 'Hello ' + userName;
}

getUser();


