import axios from 'axios';

export function setAnalyzeView() {
  return {
    type: 'SET_ANALYZE_VIEW',
  };
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
    dispatch({ type: 'SET_WAITING_VIEW' });
    axios.post('/api/extract', { data: link })
      .then((response) => {
        dispatch({ type: 'RESULTS_FULFILLED', payload: response.data });
        dispatch({ type: 'ANALYSIS_FULFILLED' });
        dispatch({ type: 'SET_RESULT_VIEW' });
      })
      .catch((err) => {
        console.error('Dispatch analysis was rejected', err);
      });
  };
}

export function getTextAnalysis(article) {
  return (dispatch) => {
    dispatch({ type: 'ANALYSIS_SUBMITTED' });
    dispatch({ type: 'SET_WAITING_VIEW' });
    axios.post('/api/analyze', { data: article })
      .then((response) => {
        dispatch({ type: 'RESULTS_FULFILLED', payload: response.data });
        dispatch({ type: 'ANALYSIS_FULFILLED' });
        dispatch({ type: 'SET_RESULT_VIEW' });
      })
      .catch((err) => {
        console.error('Dispatch analysis was rejected', err);
      });
  };
}
