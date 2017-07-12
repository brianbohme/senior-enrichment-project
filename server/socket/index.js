module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-campus', campus => {
      socket.broadcast.emit('new-campus', campus);
    });

    socket.on('new-student', student => {
      socket.broadcast.emit('new-student', student);
    });

  });

};
