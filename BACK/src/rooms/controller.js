const io = require('../socket');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../users/controller');


// création de la route qui permet de rejoindre une room

const getAll = async (req, res) => {
  const rooms = io.get().sockets.adapter.rooms;
  res.send(rooms);
}

const createRoom = async (req, res) => {

   let token = req.headers.authorization.replace('Bearer ', '');
   jwt.verify(token, JWT_SECRET, function(err, aliveToken) {
     if(!aliveToken || err) {
       res.status(403).send('Dead link');
     } else {
       console.log('Verify token ok')
     }
   })
}

module.exports = {
  getAll,
  createRoom
}