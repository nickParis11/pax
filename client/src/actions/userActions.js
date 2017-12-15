import axios from 'axios';

export function setLoginView() {
  return { type: 'SET_LOGIN_VIEW' };
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
