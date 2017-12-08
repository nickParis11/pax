import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
// import axios from 'axios';

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);
export default createStore(reducer, middleware);

// store.dispatch((dispatch) => {
//   dispatch({ type: 'FETCH_DATA_START' });
//   axios.get('https://jsonplaceholder.typicode.com/users')
//     .then((response) => {
//       dispatch({ type: 'RECEIVE_DATA', payload: response.data });
//     })
//     .catch((err) => {
//       dispatch({ type: 'FETCH_DATA_ERROR', payload: err });
//     });
// });