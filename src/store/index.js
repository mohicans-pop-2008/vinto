import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import engagementScore from './engagementScore'

const reducer = combineReducers({engagementScore})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './engagementScore'
