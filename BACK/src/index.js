const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./services/database');
const users = require('./users');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.send('You gooooooo girl!');
});

app.get('/users', users.controller.getAll);

app.post('/users', users.controller.create);

app.put('/users/update', users.controller.updateById);

app.delete('/users/:id', users.controller.remove);


app.listen(4332, function() {
  console.log('This app is on port 4332!')
});

db.connect({
  host: 'localhost',
  port: '27017',
  db: 'directaxa_db'
});

