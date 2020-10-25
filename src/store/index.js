import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import engagementScore from './engagementScore';
import participants from './participants';
import raisedHands from './raisedHands';

const reducer = combineReducers({
  engagementScore, participants, raisedHands,
});
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, middleware);

export default store;
export * from './engagementScore';
export * from './participants';
export * from './raisedHands';

// Default State
//
// {
//   participants: [
//     0: {
//       id: 1,
//       type: audienceMember,
//       handRaised: true
//     },
//     1: {
//       id: 2,
//       type: presenter,
//       handRaised: false
//     }
//   ],
//   engagementScore: 5
// }
//
// type: presenter/audienceMember
// handRaised: true/false
