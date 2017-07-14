import io from 'socket.io-client';
import store, { getCampus, getStudent, updateStudent, updateCampus } from './store';

const socket = io(window.location.origin);

/* Socket plug ins */

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-campus', campus => {
    store.dispatch(getCampus(campus));
  });

  socket.on('new-student', student => {
    store.dispatch(getStudent(student));
  });

  socket.on('student-update', student => {
    store.dispatch(updateStudent(student));
  });

  socket.on('campus-update', campus => {
    store.dispatch(updateCampus(campus));
  });
});

export default socket;
