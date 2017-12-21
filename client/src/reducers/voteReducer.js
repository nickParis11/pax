// Three potential states for arrows:
// 1. Neither upvoted or downvoted.
// 2. Upvoted.
// 3. Downvoted.
// The logic must prevent the user from upvoting and downvoting at the same time.

const initialState = {
  downVote: false,
  downVoteCount: 0,
  upVote: false,
  upVoteCount: 0,
};

export default function vote(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_VOTE_DATA':
      return {
        ...state,
        downVote: action.payload.downvote,
        downVoteCount: action.payload.downVoteCount,
        upVote: action.payload.upvote,
        upVoteCount: action.payload.upVoteCount,
      };
    default:
      return state;
  }
}
