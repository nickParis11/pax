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

export function extractArticle(url, callback) {
  return function (dispatch) {
    axios.post('/api/extract', { url: url })
      .then((response) => {
        callback(response);
      })
      .catch((err) => {
        console.log('err');
      });
  };
}

export function getAnalysis(input, url) {
  return function (dispatch) {
    dispatch({type: 'ANALYSIS_SUBMITTED'});
    axios.post('/api/analyze', { data: input })
      .then((response) => {
        dispatch({type: 'ANALYSIS_RESULTS_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'ANALYSIS_RESULTS_REJECTED', payload: err})
      });
  };
}
