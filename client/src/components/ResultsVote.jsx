import React from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import { downvote, getArticleVoteData, upvote } from '../actions/voteActions.js';

@connect((store) => {
  return {
    downVote: store.vote.downVote,
    downVoteCount: store.vote.downVoteCount,
    upVote: store.vote.upVote,
    upVoteCount: store.vote.upVoteCount,
  };
}) export default class ResultsVote extends React.Component {
  componentDidMount() {
    this.props.dispatch(getArticleVoteData());
  }

  handleKeyPress(e) {
    if (e.key === 'ArrowDown') {
      this.props.dispatch(downvote());
    } else if (e.key === 'ArrowUp') {
      this.props.dispatch(upvote());
    }
  }

  voteDown() {
    this.props.dispatch(downvote());
  }

  voteUp() {
    this.props.dispatch(upvote());
  }

  render() {
    return (
      <div className="arrows">
        <div className="arrowsContainer">
          <span
            role="button"
            tabIndex="0"
            className={this.props.upVote ? 'arrow arrowUpSelected' : 'arrow'}
            onClick={this.voteUp.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          >
            ↑
          </span>
          <Badge
            badgeContent={this.props.upVoteCount}
            primary
          />
        </div>
        <div className="arrowsContainer">
          <span
            role="button"
            tabIndex="0"
            className={this.props.downVote ? 'arrow arrowDownSelected' : 'arrow'}
            onClick={this.voteDown.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          >
            ↓
          </span>
          <Badge
            badgeContent={this.props.downVoteCount}
            secondary
          />
        </div>
      </div>
    );
  }
}
