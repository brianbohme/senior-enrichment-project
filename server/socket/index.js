module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-campus', campus => {
      socket.broadcast.emit('new-campus', campus);
    });

    socket.on('new-student', student => {
      socket.broadcast.emit('new-student', student);
    });

    socket.on('student-update', student => {
      socket.broadcast.emit('student-update', student);
    });

    socket.on('campus-update', campus => {
      socket.broadcast.emit('campus-update', campus);
    });

  });

};
