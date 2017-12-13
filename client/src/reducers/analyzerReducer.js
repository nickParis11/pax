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
  switch(action.type) {
    case 'TOGGLE_URL_TRUE':
      return { ...state, analyzeUrl: false, analyzeText: true };
      break;
    case 'TOGGLE_TEXT_TRUE':
      return { ...state, analyzeUrl: true, analyzeText: false };
      break;
    case 'ANALYZE_INPUT':
      return { ...state, input: action.payload };
      break;
    case 'ANALYSIS_SUBMITTED':
      return { ...state, success: false, waiting: true };
      break;
    case 'TONE_RESULTS_REJECTED':
      return { ...state, error: action.payload };
      break;
    case 'SENTIMENT_RESULTS_REJECTED':
      return { ...state, error: action.payload };
      break;
    case 'RESULTS_FULFILLED':
      return { ...state, tone: action.tone, sentiment: action.sentiment };
      break;
    case 'ANALYSIS_FULFILLED':
      return { ...state, success: true, waiting: false };
      break;
    default:
      return state;
  }
}
