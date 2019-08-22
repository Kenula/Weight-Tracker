const express = require('express');
const app = express();

const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const port = 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

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
