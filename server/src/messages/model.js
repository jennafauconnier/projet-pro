const mongoose = require('mongoose');

const { Schema } = mongoose;

const messagesSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
});

// REST

const Message = mongoose.model('Message', messagesSchema);

module.exports = Message;
