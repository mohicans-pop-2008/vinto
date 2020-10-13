const socket = require('socket.io');
const serverSocket = socket(server);

serverSocket.on('connection', (socket) => {
  console.log(`Connection from client ${socket.id}`);
});
