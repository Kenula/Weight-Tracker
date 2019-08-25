// Function to input a new user's name into the database
async function postNames(name) {
  const data = {name, 'entry': []};
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) 
    };
  const response = await fetch('/names', options);
  const json = await response.json();
  console.log(json);
}

// Function to retrieve existing users and create links for their profiles
async function getNames() {
  const response = await fetch('/names');
  const data = await response.json();
  for (elem in data) {
    names.push(data[elem].name);
  }
  console.log(names);

  // Creating DOM elements (links) for each existing user)
  for (name of names) {
    let nameDiv = document.createElement('div');
    let a = document.createElement('a');
    let linkName = document.createTextNode(name);
    a.id = name;
    a.appendChild(linkName);
    a.href = `Users/input.html`;
    a.addEventListener('click', (event) => {
      if (!event)
          event = window.event;
      var sender = event.srcElement || event.target;
  
      while (sender && sender.nodeName.toLowerCase() != "a")
          sender = sender.parentNode;
  
      var nameId = sender.innerHTML;
      console.log(nameId)
      passName(nameId);
  });
    nameDiv.appendChild(a);
    document.body.append(nameDiv);
  }
}

// Passes the current user's name to the server
async function passName(user) {
  const data = {user};
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data) 
  };
  const response = await fetch('/user', options);
  const json = await response.json();
  console.log(json);
}

let names = [];

// Retrieves a new user's name when the submit button is pressed
const nameButton = document.getElementById('name_submit');
nameButton.addEventListener('click', () => {
  const newName = document.getElementById('new_name').value;
  let temp_names = names.toString().toLowerCase();
  if (temp_names.includes(newName.toLowerCase())) {
    alert("That name is already in our system!");
  } else {
    names.push(newName);
    console.log(names);
    postNames(newName);
    passName(newName);
  }
});

getNames();