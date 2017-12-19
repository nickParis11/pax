import axios from 'axios';

const registerVote = (dispatch, articleId, isUpvote) => {
  axios.post('/api/vote', { article_id: articleId, upvote: isUpvote }) // <-- SHOULD WE ALSO PASS ON USER'S ID?
    .then((res) => {
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

export function downvote(articleId) {
  return (dispatch) => {
    console.log('dispatching downvote');
    dispatch({ type: 'DOWNVOTE' });
    registerVote(dispatch, articleId, false);
  };
}

// Get user vote status (up/down/nil) and total vote count (up and down).
export function getArticleVoteData(articleId) {
  return (dispatch) => {
    axios.get('/api/vote', { article_id: articleId })
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

export function upvote(articleId) {
  return (dispatch) => {
    console.log('dispatching upvote');
    dispatch({ type: 'UPVOTE' });
    registerVote(dispatch, articleId, true);
  };
}
