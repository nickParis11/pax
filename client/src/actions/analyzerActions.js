import axios from 'axios';

export function setAnalyzeView() {
  return { type: 'TOGGLE_ANALYZE_VIEW' };
}

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

export function getUrlAnalysis(link) {
  return (dispatch) => {
    dispatch({ type: 'ANALYSIS_SUBMITTED' });
    axios.post('/api/extract', { data: link })
      .then((response) => {
        dispatch({ type: 'RESULTS_FULFILLED', payload: response.data });
        dispatch({ type: 'ANALYSIS_FULFILLED' });
      })
      .catch((err) => {
        // dispatch analysis rejected
        console.log(err);
      });
  };
}

// export function extractArticle(link, callback) {
//   return () => {
//     axios.post('/api/extract', { data: link })
//       .then((response) => {
//         callback(response.data.article);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }

export function getTextAnalysis(article) {
  return (dispatch) => {
    dispatch({ type: 'ANALYSIS_SUBMITTED' });
    axios.post('/api/analyze', { data: article })
      .then((response) => {
        dispatch({ type: 'RESULTS_FULFILLED', payload: response.data });
        dispatch({ type: 'ANALYSIS_FULFILLED' });
      })
      .catch((err) => {
        // dispatch analysis rejected
        console.log(err);
      });
  };
}
