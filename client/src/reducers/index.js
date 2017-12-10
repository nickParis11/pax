import { combineReducers } from 'redux';
import analyzer from './analyzerReducer';
import user from './userReducer';

export default combineReducers({
  analyzer,
  user,
});
