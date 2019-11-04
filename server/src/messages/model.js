const mongoose = require('mongoose');

const { Schema } = mongoose;

const messagesSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
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
