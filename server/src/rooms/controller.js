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
  const roomUser = {
    room: req.body.name,
    user_id: req.__user.id,
  };
  Rooms.create({ name: req.body.name });
  RoomUsers.create(roomUser, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
};

const joinRoom = async (req, res) => {
  const existingRoom = await Rooms.findOne({ name: req.params.roomName });
  if (!existingRoom) {
    return res.status(404).send();
  }
  const roomUser = {
    room: req.params.roomName,
    user_id: req.__user.id,
  };
  const hasRoomRelation = await RoomUsers.findOne(roomUser);
  if (hasRoomRelation) {
    return res.status(200).send();
  }

  const socket = io.getSocketById(req.__user.id);
  socket.join(req.params.roomName);
  RoomUsers.create(roomUser, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
}

const addMessage = async (req, res) => {
  const data = {
    date: new Date(),
    room: req.params.roomName,
    user: req.__user.id,
    text: req.body.message,
  };

  Message.create(data, (err, createdMessage) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(req.__user, 'here', {
        ...createdMessage,
        user: {
          _id: req.__user._id,
          username: req.__user.username,
        },
      })
      io.get()
        .in(createdMessage.room)
        .emit('MESSAGE', {
          ...createdMessage._doc,
          user: {
            _id: req.__user._id,
            username: req.__user.username,
          },
        });
      res.status(200).send(createdMessage);
    }
  });
};

const getMessages = async (req, res) => {
  const messagesRoom = await Message.find(
    {
      room: req.params.roomName,
    },
    undefined,
    {
      sort: {
        date: 1,
      },
    },
  ).populate({
    path: 'user',
    populate: {
      path: 'user.username',
    },
  });
  res.status(200).send(messagesRoom);
};

module.exports = {
  getAll,
  createRoom,
  addMessage,
  getMessages,
  joinRoom,
};

// io.get()
//     .to(req.body.name)
//     .emit('focking beer');
