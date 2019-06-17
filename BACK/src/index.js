const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors")
const users = require('./users');
const bodyParser = require('body-parser');
const userRouter = require('./users/router')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get("/", function(req, res) {
  res.send("You gooooooo girl!");
});

app.get("/users", users.controller.getAll);

app.post("/users", users.controller.create);

app.post("/login", users.controller.login);

app.put("/users/update/:id", users.controller.updateById);

app.delete("/users/:id", users.controller.remove);

app.use('/users', userRouter);

mongoose.connect("mongodb://localhost:27017/chat_messenger", {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connecté a MongoDB !");
});

app.listen(4332, function() {
  console.log("This app is on port 4332!");
});


