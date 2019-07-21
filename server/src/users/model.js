const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// REST

const User = mongoose.model('User', userSchema);

module.exports = User;
