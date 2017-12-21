import axios from 'axios';

const registerVote = (dispatch, articleId, isUpvote) => {
  axios.post('/api/vote', { article_id: articleId, upvote: isUpvote })
    .then((res) => {
      dispatch({
        type: 'UPDATE_VOTE_DATA',
        payload: {
          downvote: res.data.downvote,
          downVoteCount: res.data.downVoteCount,
          upvote: res.data.upvote,
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
    registerVote(dispatch, articleId, false);
  };
}

// Get user vote status (up/down/nil) and total vote count (up and down).
export function getArticleVoteData(articleId) {
  return (dispatch) => {
    axios.get(`/api/vote/${articleId}`)
      .then((res) => { // Expects updated downvote number.
        dispatch({
          type: 'UPDATE_VOTE_DATA',
          payload: {
            downvote: res.data.downvote,
            downVoteCount: res.data.downVoteCount,
            upvote: res.data.upvote,
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
    registerVote(dispatch, articleId, true);
  };
}
