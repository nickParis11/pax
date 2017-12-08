export function toggleUrlText(url) {
  if (url) {
    return {
      type: 'TOGGLE_URL_TRUE',
    }
  } else {
    return {
      type: 'TOGGLE_TEXT_TRUE',
    }
  }
}