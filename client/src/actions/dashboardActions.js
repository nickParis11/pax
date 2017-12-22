import axios from 'axios';

export function fetchArticles() {
  return (dispatch) => {
    console.log('in dispatcher dashboard from actions');
    //dispatch({ type: 'FETCH_ARTICLES' });
    axios.get('/api/user/allArticles')
      .then((response) => {
        console.log('@@@@@@ response from all articles => ',response.data)
        dispatch({ type: 'FETCH_ARTICLES_FULFILLED', payload: response.data }); // $$$$$$$$$$$
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ARTICLES_REJECTED', payload: err }); // $$$$$$$$$$$
      });
  };
}

