import axios from 'axios';

export function downvote() {
  return (dispatch) => {
    dispatch({ type: 'DOWNVOTE' });
    axios.post('/api/vote') // Will need to specify some kind of identifier for the article.
      .then((res) => { // Expects updated downvote number.
        dispatch({ type: 'DOWNVOTE_LOGGED', payload: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

// Get user vote status (up/down/nil) and total vote count (up and down).
export function getArticleVoteData() {
  return (dispatch) => {
    axios.get('/api/vote') // Will need to specify some kind of identifier for the article.
      .then((res) => { // Expects updated downvote number.
        dispatch({
          type: 'UPDATE_VOTE_DATA',
          payload: {
            downVoteCount: res.data.downVoteCount,
            upVoteCount: res.data.upVoteCount,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function upvote() {
  return (dispatch) => {
    dispatch({ type: 'UPVOTE' });
    axios.post('/api/vote') // Will need to specify some kind of identifier for the article.
      .then((res) => {
        dispatch({ type: 'UPVOTE_LOGGED', payload: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
