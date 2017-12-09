export default function reducer(state={
  analyzeUrl: true,
  analyzeText: false,
  input: null,
}, action) {

  if (action.type === 'TOGGLE_URL_TRUE') {
    return Object.assign({state, analyzeUrl: false, analyzeText: true});
  } else if (action.type === 'TOGGLE_TEXT_TRUE') {
    return Object.assign({state, analyzeUrl: true, analyzeText: false});
  } else if (action.type === 'ANALYZE_INPUT') {
    return Object.assign({state, input: action.payload});
  }

  return state;
}