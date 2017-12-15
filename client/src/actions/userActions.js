import axios from 'axios';

export function userLogout() {
  return (dispatch) => {
    axios.get('/api/logoutUser')
      .then((res) => {
        dispatch({ type: 'LOGOUT_USER' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function setAnalyzeView() {
  return { type: 'SET_ANALYZE_VIEW' };
}

export function getUser() {
  return (dispatch) => {
    axios.get('/api/getUser')
      .then((res) => {
        console.log(res);
        dispatch({ type: 'LOGIN_CHECK', payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
