import socket from '../socket';

/**
 * ACTION TYPES
 */
const HAND_RAISED = 'hand/raised';
const HAND_LOWERED = 'hand/lowered';

/**
 * INITIAL STATE
 *
 * An empty array, signifying that array.length hands are raised
 * Each hand has the structure { key: integer, name: string, uniqueID: string }
 * The key property is distinct from the uniqueID so that ordering can be done easily.
 * uniqueID is for swift removal of a hand from an array.
 */

const defaultHands = [];

/**
 * ACTION CREATORS
 */
export const handRaiseDetected = (hand) => ({
  type: HAND_RAISED,
  name: hand.name,
  uniqueID: hand.uniqueID,
});

export const handLowerDetected = (hand) => ({
  type: HAND_LOWERED,
  uniqueID: hand.uniqueID,
});

/**
 * THUNKS
 * These will be bound to the hand raise/lower con
 */
export const raiseHand = (hand) => (dispatch) => {
  console.log('emitting hand raise event');
  socket.emit('hand/raised', hand);
  dispatch(handRaiseDetected(hand));
};

export const lowerHand = (hand) => (dispatch) => {
  console.log('emitting hand lower event');
  socket.emit('hand/lowered', hand);
  dispatch(handLowerDetected(hand));
};

/**
 * REDUCER
 *
 * case HAND_RAISED -
 * - expects an action with a name and uniqueID (uniqueID prevents name clashes)
 * - expects to return a new array containing those with their hands raised
 * - expects an array of length 0 when no hands are raised
 * - expects the number to accurately reflect the number of hands raised
 */
let key = 0; // for continuous maintenance of new raised hands
export default function (state = defaultHands, action) {
  switch (action.type) {
    case HAND_RAISED:
      const handObj = { key, name: action.name, uniqueID: action.uniqueID };
      key += 1;
      return [...state, handObj];
    case HAND_LOWERED:
      return [...state.filter((hand) => hand.uniqueID !== action.uniqueID)];
    default:
      return state;
  }
}
