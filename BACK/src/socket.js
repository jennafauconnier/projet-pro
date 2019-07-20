const http = require('http');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./users/controller')

let io;

function init(app) {
  const httpServer = http.createServer(app); 
  io = socketio(httpServer);

  io.use( async (socket, next) => {
    let token = socket.handshake.query.token;

    jwt.verify(token, JWT_SECRET, function(err, decryptedToken) {
      if (!decryptedToken || err) {
        socket.disconnect();
        return;
      }
      socket.__user = {
        id: decryptedToken.id,
        name: decryptedToken.username,
      };
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

function get() {
  return io;
}

module.exports = {
  init,
  get,
}

// connexion a un fichier socketio pour éviter une dépendance ciruculaire