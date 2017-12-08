export default function reducer(state={
  analyzeUrl: true,
  analyzeText: false,
}, action) {

  if (action.type === 'TOGGLE_URL_TRUE') {
    return Object.assign({state, analyzeUrl: false, analyzeText: true});
  } else if (action.type === 'TOGGLE_TEXT_TRUE') {
    return Object.assign({state, analyzeUrl: true, analyzeText: false});
  }

  return state;
}