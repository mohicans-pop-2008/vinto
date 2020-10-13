import io from 'socket.io-client';
import store from '../store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
});

socket.on('hand-raised', (message) => {
  store.dispatch(/* some function to dispatch a raised hand */);
});

export default socket;
