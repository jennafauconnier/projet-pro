const http = require('http');
const socketio = require('socket.io');

let io;

function init(app) {
  const httpServer = http.createServer(app); 
  io = socketio(httpServer);

  io.use((socket, next) => {
    let token = socket.handshake.query.token;
    console.log('new connection with token', token)
    // check validité token
    if (token) {
      return next();
    }
    return next(new Error('authentication error'));
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