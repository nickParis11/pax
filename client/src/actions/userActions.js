export function setLoginView() {
  return { type: 'SET_LOGIN_VIEW', };
}

export function setAnalyzeView() {
  return { type: 'SET_ANALYZE_VIEW', };
}

export function setUsername(username) {
  return { type: 'SET_USERNAME', payload: username, };
}

export function setPassword(password) {
  return { type: 'SET_PASSWORD', payload: password, };
}