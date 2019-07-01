const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./model.js');

userRouter.post('/login', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  User.find({ username, email, password }, (err, find_res) => {
    if (err) {
      res.json({ "resultType" : "failure", "resultMessage" : err });
    } else if (find_res.length === 0) {
      res.json({ "resultType" : "failure", "resultMessage" : "Wrong credentials" });
    } else {
      const token = jwt.sign({ username, email }, "Wrong gurl");
      res.json({ "resultType" : "Success", "resultMessage" : "You are successfully logged in", "token" : token });
    }
  })
})

userRouter.post('/login', (req, res) => {
  const newUser = new User(req.body)

  newUser.save((err, user) => {
    if (err) {
      res.json({ "resultType" : "failure", "resultMessage" : err });
    } else {
      res.json({ "resultType" : "success", "resultMessage" : "Account successfully created" })
    }
  })
})

module.exports = userRouter;