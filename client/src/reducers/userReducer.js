const initialState = {
  login: false,
  password: null,
  username: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'SET_ANALYZE_VIEW':
      return { ...state, loginView: false };
    case 'LOGIN_CHECK':
      return { ...state, login: action.payload };
    case 'LOGOUT_USER':
      return { ...state, login: false };
    default:
      return state;
  }
}
