/**
 * ACTION TYPES
 */
const ENGAGEMENT_SCORE_CHANGED = 'engagementScore/changed';

/**
 * INITIAL STATE
 *
 * a full score is 10
 */
const defaultScore = 5;

/**
 * ACTION CREATORS
 */
export const engagementScoreChangeDetected = (videoTracks) => ({
  type: ENGAGEMENT_SCORE_CHANGED,
  videoTracks,
});

/**
 * REDUCER
 *
 * case ENGAGEMENT_SCORE_CHANGED -
 * - expects an action with the videoTracks array
 * - expects to return an actual number
 * - expects engagement score of 10 when all cameras are onload
 * - expects engagement score of 0 when all cameras are off
 */

const reducer = (state = defaultScore, action) => {
  let newScore;
  switch (action.type) {
    case ENGAGEMENT_SCORE_CHANGED:
      console.log(action.videoTracks.length);
      newScore = action.videoTracks.length > 0
        ? (action.videoTracks.filter((track) => track.isMuted() === false)
          .length
              / action.videoTracks.length)
            * 10
        : state;
      return newScore;
    default:
      return state;
  }
};

export default reducer;
