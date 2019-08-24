var userName;
var xLabels = [];
var yValues = [];
var timeFormat = 'YYYY/MM/DD';
var graphInputs = [];

// Retrieves the current user's name
async function setup() {
  const responseUser = await fetch('/user');
  const user = await responseUser.json();
  userName = user.user;
  document.getElementById('greet').innerText = 'Hi ' + userName + ',';

  getInputs();
}

// Retrieves the current user's date and weight inputs
async function getInputs() {
  const responseInput = await fetch(`/inputs/${userName}`);
  const rawInputs = await responseInput.json();
  const inputs = rawInputs[0].entry;
  console.log(inputs);

  fillGraphInputs(inputs);

  graph();

}

// Generates data points to be plotted on the graph
function fillGraphInputs(inputs) {
  for (input of inputs) {
    const xDate = input[0];
    yWeight = input[1];
    graphInputs.push({x: xDate, y: yWeight});
  }
  console.log(graphInputs);
}

// Graphing the weight and date values
function graph() {
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',

    data: {
        datasets: [{
            label: "Your weight in pounds",
            backgroundColor: 'rgb(50, 99, 150)',
            borderColor: 'rgb(50, 99, 255)',
            data: graphInputs,
            fill: false,
        }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day'
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Date (Year/Month/Day)'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Weight (lb)'
          }
        }]
      }
    }
});
}

setup();