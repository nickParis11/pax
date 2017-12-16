import { combineReducers } from 'redux';
import analyzer from './analyzerReducer';
import user from './userReducer';
import vote from './voteReducer.js';

export default combineReducers({
  analyzer,
  user,
  vote,
});
