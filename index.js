const express = require('express');
const app = express();

const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.static('public'));

const port = 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

