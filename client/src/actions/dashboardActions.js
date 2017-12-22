import axios from 'axios';

export function fetchArticles() {
  return function (dispatch) {
    console.log('in dispatcher dashboard from actions');
    dispatch({ type: 'FETCH_ARTICLES' });
    axios.get('/api/userarticles') // TBD
      .then((response) => {
        dispatch({ type: 'FETCH_ARTICLES_FULFILLED', payload: response.data }); // $$$$$$$$$$$
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ARTICLES_REJECTED', payload: err }); // $$$$$$$$$$$
      });
  };
}
