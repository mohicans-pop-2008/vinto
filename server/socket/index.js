// NEED TO PULL IN appropriate requirements where socket.io-client will be used.

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('hand-raised', (hand) => {
      socket.broadcast.emit('hand-raised', hand);
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`);
    });
  });
};
