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
    return { ...state, analyzeUrl: false, analyzeText: true };
  } else if (action.type === 'TOGGLE_TEXT_TRUE') {
    return { ...state, analyzeUrl: true, analyzeText: false };
  } else if (action.type === 'ANALYZE_INPUT') {
    return { ...state, input: action.payload };
  } else if (action.type === 'ANALYSIS_SUBMITTED') {
    return { ...state, waiting: true };
  } else if (action.type === 'ANALYSIS_RESULTS_FULFILLED') {
    return { ...state, success: true, analysis: action.payload, waiting: false };
  } else if (action.type === 'ANALYSIS_RESULTS_REJECTED'){
    return { ...state, error: action.payload, waiting: false };
  }
  return state;
}
