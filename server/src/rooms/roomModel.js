const mongoose = require('mongoose');

const { Schema } = mongoose;

const createRoomUser = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
});

const RoomUsers = mongoose.model('RoomUsers', createRoomUser);

module.exports = RoomUsers;
