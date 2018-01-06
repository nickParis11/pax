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
