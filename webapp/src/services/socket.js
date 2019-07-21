import io from 'socket.io-client';

//connection a socket.io

export function connectSocket(token) {
  const socket = io(`http://localhost:3007?token=${token}`);

  socket.on('connect', (socket) => {
    console.log('connected')
  });
}

