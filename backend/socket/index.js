const io = require('socket.io')();

io.on('connection', async function (socket) {
    console.log('socket connection...',  socket.id);
    socket.on('stock added', function (data) {
        socket.broadcast.emit('stock added', data);
    });
});

module.exports.io = io;