import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);

const store = createStore(reducer, middleware);

store.subscribe(()=> {
  console.log('stored changed ', store.getState());
})
export default store
