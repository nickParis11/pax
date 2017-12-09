import axios from 'axios';

export function toggleUrlText(url) {
  if (url) {
    return {
      type: 'TOGGLE_URL_TRUE',
    }
  } else {
    return {
      type: 'TOGGLE_TEXT_TRUE',
    }
  }
}

export function getAnalyzation(input) {
  // return function(dispatch) {
    // axios.get(URL)
      // .then((response) => {
        // dispatch({type: 'FETCH_RESULTS_FULFILLED', payload: response.data})
      // })
      // .catch((err) => {
        // dispatch({type: 'FETCH_RESULTS_REJECTED', payload: err})
      // })
  // }
  return {
    type: 'ANALYZE_INPUT',
    payload: input,
  }
}