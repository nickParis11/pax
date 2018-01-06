const initialState = {
  articles: '', 
  visible: false,
  defaultInternalView: true,
  errorInternalView: false,
  showArticlesView: false,
  dialogVisible: false,
  hoveredArticle: null,
};


export default function dashboard(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_ARTICLES_FULFILLED':
      return {
        ...state,
        articles: action.payload,
        errorInternalView: false,
        defaultInternalView: false,
        showArticlesView: true,
      };
    case 'FETCH_ARTICLES_REJECTED':
      return {
        ...state,
        errorInternalView: true,
        defaultInternalView: false,
        showArticlesView: false,
      };
    case 'SHOW_DIALOG':
      return {
        ...state,
        dialogVisible: true,
      };
    case 'HIDE_DIALOG':
      return {
        ...state,
        dialogVisible: false,
      };
    case 'SET_HOVERED_ARTICLE':
      return {
        ...state,
        hoveredArticle: action.payload,
      };
    default:
      return state;
  }
}

