import axios from 'axios';

export function toggleUrlText(url) {
  if (url) {
    return {
      type: 'TOGGLE_URL_TRUE',
    };
  }
  return {
    type: 'TOGGLE_TEXT_TRUE',
  };
}

export function extractArticle(link, callback) {
  return function (dispatch) {
    axios.post('/api/extract', { data: link })
      .then((response) => {
        callback(response.data.article);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getAnalysis(article) {
  return function (dispatch) {
    dispatch({type: 'ANALYSIS_SUBMITTED'});
    axios.post('/api/analyze', { data: article })
      .then((response) => {
        dispatch({ type: 'ANALYSIS_RESULTS_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'ANALYSIS_RESULTS_REJECTED', payload: err });
      });
  };
}
