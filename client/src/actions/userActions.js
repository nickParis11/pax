import axios from 'axios';

export function userLogout() {
  return (dispatch) => {
    axios.get('/api/logoutUser')
      .then(() => {
        dispatch({ type: 'LOGOUT_USER' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getUser() {
  return (dispatch) => {
    axios.get('/api/getUser')
      .then((res) => {
        dispatch({ type: 'LOGIN_CHECK', payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
