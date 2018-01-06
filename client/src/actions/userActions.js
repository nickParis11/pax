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


export function getUserUpvoteAverages() {
  return (dispatch) => {
    axios.get('/api/user/upvoteAverages')
      .then((res) => {
        dispatch({ type: 'USER_UPVOTE_AVERAGES', payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function setView(view) {
  return { type: view };
}
