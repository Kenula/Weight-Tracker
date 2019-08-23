const express = require('express');
const app = express();

const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const port = 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

//Handles inputting and retrieving names in the database
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

//Handles weight and date inputs from the user
app.post('/inputs', (req, res) => {
  const data = req.body;
  console.log(data);
  database.update({ name: data.userName }, { $push: { entry: [data.date, data.weight] } }, {}, function () {
    console.log('Worked!');
    database.persistence.compactDatafile();
  });
  res.json(data);
});

app.get('/inputs/:name', (req, res) => {
  const user = req.params.name; 
  console.log(user);
  database.find({ name: user }, (err, data) => {
    if (err) {
      res.end();
      return;
    } else {
      res.json(data);
    }
  });
});