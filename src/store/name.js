/**
 * ACTION TYPES
 */
const NAME_ENTERED = 'name/entered';

/**
 * INITIAL STATE
 *
 * an empty string, to be populated with the user's name
 */
const defaultName = '';

/**
 * ACTION CREATORS
 */
export const nameChangeDetected = (name) => ({
  type: NAME_ENTERED,
  name,
});

/**
 * REDUCER
 *
 * case NAME_ENTERED -
 * - expects an action with the user's entered name string.
 * - expects a non-empty string
 */

const reducer = (state = defaultName, action) => {
  switch (action.type) {
    case NAME_ENTERED:
      return action.name;
    default:
      return state;
  }
};

export default reducer;
