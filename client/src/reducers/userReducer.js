const initialState = {
  login: false,
  upvoteAverages: {
    anger: 0,
    disgust: 0,
    fear: 0,
    joy: 0,
    sadness: 0,
    analytical: 0,
    confident: 0,
    tentative: 0,
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    emotional_range: 0,
  },
  loginView : false,
  dashboardView : false,
  inputView : true,
  resultView : false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'SET_ANALYZE_VIEW':
      return { ...state, loginView: false, dashboardView : false, inputView : true, resultView : false  };
    case 'LOGIN_CHECK':
      return { ...state, login: action.payload };
    case 'LOGOUT_USER':
      return { ...state, login: false, dashboardView : false, loginView : true, inputView : true, resultView : false  };
    case 'USER_UPVOTE_AVERAGES':
      return { ...state, upvoteAverages: action.payload };
    case 'SET_DASHBOARD_VIEW':
      return { ...state, dashboardView : true, inputView : false, resultView : false };
    case 'SET_RESULT_VIEW' : 
      return { ...state, dashboardView : false, inputView : false, resultView : true };
    default:
      return state;
  }
}
