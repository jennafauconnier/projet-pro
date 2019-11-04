const io = require('../socket');
const Message = require('../messages/model');
const RoomUsers = require('./roomModel');
const Rooms = require('./model');

// création de la route qui permet de rejoindre une room
const getAll = async (req, res) => {
  const rooms = await Rooms.find({})
  res.send({
    rooms,
  });
};

const createRoom = async (req, res) => {
  const socket = io.getSocketById(req.__user.id);
  socket.join(req.body.name);
  // add document user_id, room_name
  const createRoomUser = {
    room: req.body.name,
    user_id: req.__user.id,
  };
  Rooms.create({ name: req.body.name })
  RoomUsers.create(createRoomUser, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
};

const addMessage = async (req, res) => {
  const data = {
    date: new Date(),
    room: req.params.roomName,
    user_id: req.__user.id,
    text: req.body.message,
  };

  Message.create(data, (err, createdMessage) => {
    if (err) {
      res.status(500).send(err);
    } else {
      io.get()
        .in(createdMessage.room)
        .emit('MESSAGE', createdMessage);
      res.status(200).send(createdMessage);
    }
  });
};

const getMessages = async (req, res) => {
  const messagesRoom = await Message.find({
      room: req.params.roomName,
    },
    undefined,
    {
      sort: {
        date: 1,
      },
    },
  );
  res.status(200).send(messagesRoom);
};

module.exports = {
  getAll,
  createRoom,
  addMessage,
  getMessages,
};

// io.get()
//     .to(req.body.name)
//     .emit('focking beer');
