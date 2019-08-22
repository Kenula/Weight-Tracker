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

async function getNames() {
  const response = await fetch('/names');
  const data = await response.json();
  for (elem in data) {
    names.push(data[elem].name);
  }
  console.log(names);



  for (name of names) {
    let nameDiv = document.createElement('div');
    let a = document.createElement('a');
    let linkName = document.createTextNode(name);
    a.appendChild(linkName);
    a.href = '/users/input.html';
  
    nameDiv.appendChild(a);
    document.body.append(nameDiv);
  }

}

let names = [];


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
  }
});

getNames();



