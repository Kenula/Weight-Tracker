var userName;
async function setup() {
  // Retrieves the current user's name
  const response = await fetch('/user');
  const user = await response.json();
  userName = user.user;
  document.getElementById('greet').innerText = 'Welcome ' + userName + '!';

  // Configures the submit button to send date and weight when pressed
  const wdButton = document.getElementById('submit');
  wdButton.addEventListener('click', async () => {
    
    const date = document.getElementById('date').value;
    const weight = document.getElementById('weight').value;
    
    if (isNaN(weight)) {
      alert("Your weight value is not a number!");
    } else if (date.length == 0 || weight.length == 0) {
      alert("Don't leave fields blank!")
    } else {
      const data = {userName, date, weight}

      // Transfers date and weight to the server
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      const response = await fetch('/inputs', options);
      const jsond = await response.json();
      console.log(json);
      getInputs();
    }
  });
  getInputs();
}

// Function to retrieve weight and date values from the database
async function getInputs() {
  const response = await fetch(`/inputs/${userName}`);
  const json = await response.json();
  const inputs = json[0].entry;
  console.log(inputs);
  
  // Prints the entries onto the page
  const entryDiv = document.getElementById('entries');
  entryDiv.innerHTML = "";
  for (entry of inputs) {
    console.log(entry);
    const entryP = document.createElement('p');
    let content = document.createTextNode(`${entry[0]}:  ${entry[1]} lb`);
    entryP.appendChild(content);
    entryDiv.appendChild(entryP);
  }
}

setup();

