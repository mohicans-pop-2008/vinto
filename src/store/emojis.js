import socket from '../socket';

/**
 * ACTION TYPES
 */
const EMOJI_CLICKED = 'emoji/clicked';

/**
 * INITIAL STATE
 *
 * // initial state should be an object having three keys on it: laughs, claps and confused. Each one of these keys holds an array, starts off an empty and it will take just uniqueIds.
 */
const defaultEmojis = {
  laughs: 0,
  claps: 0,
  confused: 0,
};

/**
 * ACTION CREATORS
 */
export const emojiClicked = (emojiType) => ({
  type: EMOJI_CLICKED,
  emojiType,
});

/**
 * THUNKS
 * These will be bound to the emoji/click con
 */
export const emojiClick = (emojiType) => (dispatch) => {
  console.log('some emoji');
  socket.emit('emoji/clicked', emojiType);
  dispatch(emojiClicked(emojiType));
};

/**
 * REDUCER
 *
 */
const reducer = (state = defaultEmojis, action) => {
  switch (action.type) {
    case EMOJI_CLICKED:
      return state[action.emojiType];
    default:
      return state;
  }
};

export default reducer;
