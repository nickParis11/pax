import { combineReducers } from 'redux';
import analyzer from './analyzerReducer';
import user from './userReducer';
import vote from './voteReducer.js';
import dashboard from './dashboardReducer.js';

export default combineReducers({
  analyzer,
  user,
  vote,
  dashboard,
});
