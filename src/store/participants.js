/**
 * ACTION TYPES
 */
const PARTICIPANTS_CHANGED = 'participants/changed';

/**
 * INITIAL STATE
 *
 * a full score is 10
 */
const defaultParticipants = 1;

/**
 * ACTION CREATORS
 */
export const numberOfParticipantsChanged = (videoTracks) => ({
  type: PARTICIPANTS_CHANGED,
  videoTracks,
});

/**
 * REDUCER
 *
 */
const reducer = (state = defaultParticipants, action) => {
  switch (action.type) {
    case PARTICIPANTS_CHANGED:
      return action.videoTracks.length;
    default:
      return state;
  }
};

export default reducer;
