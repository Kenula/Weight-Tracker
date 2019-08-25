const express = require('express');
const app = express();

const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));


// Handles inputting and retrieving names in the database
app.post('/names', (req, res) => {
  database.insert(req.body);
  res.json(req.body);
});

app.get('/names', (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    } else {
      res.json(data);
    }
  });
});

// Handles the current user's name
global.user;
app.post('/user', (req, res) => {
  user = req.body;
  res.json(user);
});

app.get('/user', (req, res) => {
  res.json(user);
});

// Handles weight and date inputs from the user
app.post('/inputs', (req, res) => {
  const data = req.body;
  database.update({ name: data.userName }, { $push: { entry: [data.date, data.weight] } }, {}, function () {
    database.persistence.compactDatafile();
  });

  // Sorts the inputs by date and updates the database
  database.find({ name: data.userName }, (err, data) => {
    let sortedValues = data[0].entry.slice();
    
    for (elem of sortedValues) {
      elem[0] = elem[0].toString().split('-');
    }
    sortedValues.sort(function (a, b) {
      return a[0][0] - b[0][0] || a[0][1] - b[0][1] || a[0][2] - b[0][2];
    });
    for (elem of sortedValues) {
      elem[0] = elem[0].join('-');
    }
    database.update({ name: data[0].name }, { $set: { entry: sortedValues } }, {}, function () {
      database.persistence.compactDatafile();
    });
  res.json(data);
  });
});

// Sends weight and date data for a specific user back to the client
app.get('/inputs/:name', (req, res) => {
  const user = req.params.name; 
  database.find({ name: user }, (err, data) => {
    if (err) {
      res.end();
      return;
    } else {
      res.json(data);
    }
  });
});

// Deletes database entry when the 'clear entries' button is pressed
app.post('/clear', (req, res) => {
  database.update({ name: user.user }, { $set: { entry: [] } }, {}, function () {
    database.persistence.compactDatafile();
  });
  res.send("Clear Successful");
});