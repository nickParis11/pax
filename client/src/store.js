import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  fetching: false,
  fetched: true,
  data: [],
  error: null,
};

const reducer = (state=initialState, action) => {
  if (action.type === 'FETCH_DATA_START') {
    return Object.assign({state, fetching: true});
  } else if (action.type === 'FETCH_DATA_ERROR') {
    return Object.assign({state, fetching: false, error: action.payload});
  } else if (action.type === 'RECEIVE_DATA') {
    return Object.assign({state,
      fetching: false,
      fetched: true,
      data: action.payload
    });
  }

  return state;
}

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducer, middleware);

store.dispatch((dispatch) => {
  dispatch({ type: 'FETCH_DATA_START' });
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      dispatch({ type: 'RECEIVE_DATA', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_DATA_ERROR', payload: err });
    });
});

export default store;