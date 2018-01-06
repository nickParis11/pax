import axios from 'axios';

export function fetchArticles() {
  return (dispatch) => {
    axios.get('/api/user/allArticles')
      .then((response) => {
        dispatch({ type: 'FETCH_ARTICLES_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ARTICLES_REJECTED', payload: err });
      });
  };
}

export function showDialog () {
  return (dispatch) => {
    dispatch({type:'SHOW_DIALOG'});
  }
}

export function hideDialog () {
  return (dispatch) => {
    dispatch({type:'HIDE_DIALOG'});
  }
}

export function setHoveredArticle (article) {
  return (dispatch) => {
    dispatch({ type : 'SET_HOVERED_ARTICLE', payload : article })
  }
}
