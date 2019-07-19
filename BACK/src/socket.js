const http = require('http');
const socketio = require('socket.io');

let io;

function init(app) {
  const httpServer = http.createServer(app); 
  io = socketio(httpServer);

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