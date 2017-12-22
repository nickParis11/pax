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
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_CHECK':
      return { ...state, login: action.payload };
    case 'LOGOUT_USER':
      return { ...state, login: false };
    case 'USER_UPVOTE_AVERAGES':
      return { ...state, upvoteAverages: action.payload };
    default:
      return state;
  }
}
