const mongoose = require('mongoose');

const { Schema } = mongoose;

const Rooms = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const RoomsModel = mongoose.model('Rooms', Rooms);

module.exports = RoomsModel;
