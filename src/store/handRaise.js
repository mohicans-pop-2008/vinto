/**
 * ACTION TYPES
 */
const HAND_RAISED = 'hand/raised';
const HAND_LOWERED = 'hand/lowered';

/**
 * INITIAL STATE
 *
 * An empty array, signifying that array.length hands are raised
 * Each hand has the structure { key: integer, name: string }
 * The idea is to have a dedicated key so that the array's order can always be maintained via
 * array.sort using the key property.
 */

const defaultHands = [];

/**
 * ACTION CREATORS
 */
export const handRaiseDetected = (participant) => ({
  type: HAND_RAISED,
  participant,
});

export const handLowerDetected = (participant) => ({
  type: HAND_LOWERED,
  participant,
});

/**
 * REDUCER
 *
 * case HAND_RAISED -
 * - expects an action with the videoTracks array
 * - expects to return an actual number
 * - expects engagement score of 10 when all cameras are onload
 * - expects engagement score of 0 when all cameras are off
 */
export default function (state = defaultHands, action) {
  let key = 0;
  switch (action.type) {
    case HAND_RAISED:
      return participant // WIP
    default:
      return state;
  }
}
