const http = require('http');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./users/controller');
const RoomUsers = require('./rooms/roomModel');

let io;

function init(app) {
  const httpServer = http.createServer(app);
  io = socketio(httpServer);

  io.use(async (socket, next) => {
    const token = socket.handshake.query.token;

    jwt.verify(token, JWT_SECRET, async function(err, decryptedToken) {
      if (!decryptedToken || err) {
        socket.disconnect();
        return;
      }
      socket.__user = {
        id: decryptedToken.id,
        name: decryptedToken.username,
      };
      // get all rooms for a user_id and join all rooms for this socket
      const userRooms = await RoomUsers.find({
        user_id: decryptedToken.id
      });
      console.log('new connection', {
        userRooms,
        user: decryptedToken
      })
      userRooms.forEach(userRoom => {
        socket.join(userRoom.room)
      })
      return next()
    });
  });

  io.on('connection', function(socket){
    console.log('a user connected');
  });
  
  httpServer.listen(3007, function(){
    console.log('listening on *:3007');
  });
}

function getSocketById(id) {
  const sockets = Object.values(io.sockets.clients().sockets);
  const matchingSocket = sockets.find(socket => socket.__user.id === id);
  return matchingSocket;
}

function get() {
  return io;
}

module.exports = {
  init,
  get,
  getSocketById,
};

// connexion a un fichier socketio pour éviter une dépendance ciruculaire