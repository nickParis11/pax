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
    case 'DOWNVOTE':
      return { ...state, downVote: !state.downVote, upVote: false };
    case 'UPVOTE':
      return { ...state, downVote: false, upVote: !state.upVote };
    case 'UPDATE_VOTE_DATA':
      return { ...state, downVoteCount: action.payload.downVoteCount, upVoteCount: action.payload.upVoteCount };
    default:
      return state;
  }
}
