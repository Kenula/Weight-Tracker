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
