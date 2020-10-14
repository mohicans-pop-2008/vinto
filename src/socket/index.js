import io from 'socket.io-client';
import store, { handRaiseDetected, handLowerDetected } from '../store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
});

socket.on('hand/raised', (hand) => {
  console.log('receiving hand raise event');
  store.dispatch(handRaiseDetected(hand));
});

socket.on('hand/lowered', (hand) => {
  console.log('receiving hand lower event');
  store.dispatch(handLowerDetected(hand));
});

export default socket;
