const io = require('../socket');

// création de la route qui permet de rejoindre une room
const getAll = async (req, res) => {
  const { rooms } = io.get().sockets.adapter.rooms;
  res.send({
    rooms,
  });
};

const createRoom = async (req, res) => {
  const socket = io.getSocketById(req.__user.id);
  socket.join(req.body.name);
  res.send();
};

module.exports = {
  getAll,
  createRoom,
};
