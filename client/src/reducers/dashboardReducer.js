const initialState = {
  articles: `this should be replaced with real data
 it will be ultimately 
 a multi dimensionnal array with :
 ARTICLEs | SCORE | .....`, // TB REMOVED
  visible: false,
  defaultInternalView: true,
  errorInternalView: false,
  showArticlesView: false,
  dialogVisible: false,
  hoveredArticle: null,
};


export default function dashboard(state = initialState, action) {
 	
	if ( action.type === 'FETCH_ARTICLES_FULFILLED') {
			return {
				...state, 
				articles: action.payload,
				errorInternalView : false, defaultInternalView : false, showArticlesView : true, 
			}
	}
	if ( action.type === 'FETCH_ARTICLES_REJECTED') {
		return {...state, 
			errorInternalView: true, 
			defaultInternalView: false, 
			showArticlesView: false, }
	}

	if ( action.type === 'SHOW_DIALOG') {
		return {...state, 
			dialogVisible: true, }
	}

	if ( action.type === 'HIDE_DIALOG') {
		return {...state, 
			dialogVisible: false, }
	}

	if ( action.type === 'SET_HOVERED_ARTICLE') {
		return {...state, 
			hoveredArticle: action.payload }
	}
 		return state;
}

