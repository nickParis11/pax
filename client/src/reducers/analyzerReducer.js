export default function reducer(state = {
  analysis: null,
  analyzeUrl: true,
  analyzeText: false,
  error: null,
  input: null,
  sucess: null,
  waiting: false,
}, action) {
  if (action.type === 'TOGGLE_URL_TRUE') {
    return Object.assign({ state, analyzeUrl: false, analyzeText: true });
  } else if (action.type === 'TOGGLE_TEXT_TRUE') {
    return Object.assign({ state, analyzeUrl: true, analyzeText: false });
  } else if (action.type === 'ANALYZE_INPUT') {
    return Object.assign({ state, input: action.payload });
  } else if (action.type === 'ANALYSIS_SUBMITTED') {
    return Object.assign({ state, waiting: true })
  }else if (action.type === 'ANALYSIS_RESULTS_FULFILLED') {
    return Object.assign({ state, success: true, analysis: action.payload, waiting: false });
  } else if (action.type === 'ANALYSIS_RESULTS_REJECTED'){
    return Object.assign({ state, error: action.payload, waiting: false });
  }
  return state;
}
