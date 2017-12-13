const initialState = {
  analyzeUrl: true,
  analyzeText: false,
  error: null,
  input: null,
  sentiment: null,
  success: false,
  tone: null,
  waiting: false,
};

export default function analyzer(state = initialState, action) {
  if (action.type === 'TOGGLE_URL_TRUE') {
    return { ...state, analyzeUrl: false, analyzeText: true };
  } else if (action.type === 'TOGGLE_TEXT_TRUE') {
    return { ...state, analyzeUrl: true, analyzeText: false };
  } else if (action.type === 'ANALYZE_INPUT') {
    return { ...state, input: action.payload };
  } else if (action.type === 'ANALYSIS_SUBMITTED') {
    return { ...state, success: false, waiting: true };
  } else if (action.type === 'TONE_RESULTS_REJECTED') {
    return { ...state, error: action.payload };
  } else if (action.type === 'SENTIMENT_RESULTS_REJECTED') {
    return { ...state, error: action.payload };
  } else if (action.type === 'RESULTS_FULFILLED') {
    return { ...state, tone: action.tone, sentiment: action.sentiment };
  } else if (action.type === 'ANALYSIS_FULFILLED') {
    return { ...state, success: true, waiting: false };
  }

  return state;
}
