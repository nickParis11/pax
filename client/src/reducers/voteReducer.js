const initialState = {
  downVote: false,
  downVoteCount: 0,
  upVote: false,
  upVoteCount: 0,
};

export default function vote(state = initialState, action) {
  switch (action.type) {
    case 'DOWNVOTE':
      return { ...state, upVote: !state.downVote };
    case 'DOWNVOTE_LOGGED':
      return { ...state, downVoteCount: action.payload };
    case 'UPVOTE':
      return { ...state, upVote: !state.upVote };
    case 'UPVOTE_LOGGED':
      return { ...state, upVoteCount: action.payload };
    case 'UPDATE_VOTE_DATA':
      return { ...state, downVoteCount: action.payload.downVoteCount, upVoteCount: action.payload.upVoteCount };
    default:
      return state;
  }
}
