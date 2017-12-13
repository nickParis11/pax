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
  switch (action.type) {
    case 'TOGGLE_URL_TRUE':
      return { ...state, analyzeUrl: false, analyzeText: true };
    case 'TOGGLE_TEXT_TRUE':
      return { ...state, analyzeUrl: true, analyzeText: false };
    case 'ANALYZE_INPUT':
      return { ...state, input: action.payload };
    case 'ANALYSIS_SUBMITTED':
      return { ...state, success: false, waiting: true };
    case 'TONE_RESULTS_REJECTED':
      return { ...state, error: action.payload };
    case 'SENTIMENT_RESULTS_REJECTED':
      return { ...state, error: action.payload };
    case 'RESULTS_FULFILLED':
      return { ...state, tone: action.tone, sentiment: action.sentiment };
    case 'ANALYSIS_FULFILLED':
      return { ...state, success: true, waiting: false };
    default:
      return state;
  }
}
