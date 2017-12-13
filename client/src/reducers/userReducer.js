const initialState = {
  login: false,
  loginView: false,
  password: null,
  signup: false,
  username: null,
};

export default function user(state = initialState, action) {
  switch(action.type) {
    case 'SET_ANALYZE_VIEW':
      return { ...state, loginView: false };
      break;
    case 'SET_LOGIN_VIEW':
      return { ...state, loginView: true };
      break;
    default:
      return state;
  }
}
