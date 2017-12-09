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
        let tone = response.data;
        axios.post('/api/sentiment', { data: article })
          .then((response) => {
            let sentiment = response.data;
            dispatch({type: 'RESULTS_FULFILLED', sentiment, tone});
            dispatch({type: 'ANALYSIS_FULFILLED'});
          })
          .catch((err) => {
            dispatch({type: 'SENTIMENT_RESULTS_REJECTED', payload: err});
          });
      })
      .catch((err) => {
        dispatch({type: 'TONE_RESULTS_REJECTED', payload: err})
      });
  };
}
