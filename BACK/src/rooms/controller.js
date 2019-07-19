const io = require('../socket');

// création de la route qui permet de rejoindre une room

const getAll = async (req, res) => {
  const rooms = io.get().sockets.adapter.rooms;
  res.send(rooms);
}

module.exports = {
  getAll
}