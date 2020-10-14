import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import engagementScore from './engagementScore';
import participants from './participants';
import raiseHand from './raiseHand';

const reducer = combineReducers({ engagementScore, participants, raiseHand });
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, middleware);

export default store;
export * from './engagementScore';
export * from './participants';
export * from './raiseHand';
