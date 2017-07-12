import io from 'socket.io-client';
import store, { getCampus, getStudent } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  socket.on('new-campus', campus => {
    store.dispatch(getCampus(campus));
  });

  socket.on('new-student', student => {
    store.dispatch(getStudent(student));
  });
});

export default socket;
