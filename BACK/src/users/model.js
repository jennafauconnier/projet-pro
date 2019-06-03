const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;


const userSchema = new Schema({
  _id: {
   type: String,
   required: true
  },
  username: {
    type: String,
    index: true,
    required: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'visitor'],
    required: true,
    default: 'visitor'
  }
})

// REST 


const User = mongoose.model('User', userSchema)


module.exports = User;
