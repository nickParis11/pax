const initialState = {
  login: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_CHECK':
      return { ...state, login: action.payload };
    case 'LOGOUT_USER':
      return { ...state, login: false };
    default:
      return state;
  }
}
