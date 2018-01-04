const initialState = {
  articles: `this should be replaced with real data
 it will be ultimately 
 a multi dimensionnal array with :
 ARTICLEs | SCORE | .....`, // TB REMOVED
  visible: false,
  defaultInternalView: true,
  errorInternalView: false,
  showArticlesView: false,
};

export default function dashboard(state = initialState, action) {
  if (action.type === 'FETCH_ARTICLES_FULFILLED') {
    return {
      ...state,
      articles: action.payload,
      errorInternalView: false,
      defaultInternalView: false,
      showArticlesView: true,
    };
  }
  if (action.type === 'FETCH_ARTICLES_REJECTED') {
    return {
      ...state,
      errorInternalView: true,
      defaultInternalView: false,
      showArticlesView: false,
    };
  }
  return state;
}

