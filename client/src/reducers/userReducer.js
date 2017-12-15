const initialState = {
  login: false,
  loginView: false,
  password: null,
  signup: false,
  username: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'SET_ANALYZE_VIEW':
      return { ...state, loginView: false };
    case 'SET_LOGIN_VIEW':
      return { ...state, loginView: true };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'LOGIN_CHECK':
      return { ...state, login: action.payload };
    default:
      return state;
  }
}
