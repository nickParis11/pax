import React from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import { downvote, getArticleVoteData, upvote } from '../actions/voteActions.js';

@connect((store) => {
  return {
    downVote: store.vote.downVote,
    downVoteCount: store.vote.downVoteCount,
    score: store.analyzer.score,
    sentiment: store.analyzer.sentiment,
    tone: store.analyzer.tone,
    upVote: store.vote.upVote,
    upVoteCount: store.vote.upVoteCount,
  };
}) export default class Results extends React.Component {
  componentDidMount() {
    this.props.dispatch(getArticleVoteData());
  }

  voteDown() {
    this.props.dispatch(downvote());
  }

  voteUp() {
    this.props.dispatch(upvote());
  }

  render() {
    return (
      <div>
        <h1 className="componentTitle">RESULTS</h1>
        <h2 className="trustRating">Trust Rating: {this.props.score}</h2>
        <div className="row">
          <div className="summaryContainer">
            <p><b>Summary: </b>
              <br />
              Polarity: {this.props.sentiment.polarity}
              <br />
              Health goth DIY ramps skateboard.
              <br />
              IPhone 8-bit williamsburg cronut try-hard humblebrag.
            </p>
          </div>
          <div className="arrowsContainer">
            <span className={this.props.upVote ? 'arrow arrowUpSelected' : 'arrow'} onClick={this.voteUp.bind(this)}>↑</span>
            <Badge
              badgeContent={this.props.upVoteCount}
              primary
            />
            <span className={this.props.downVote ? 'arrow arrowDownSelected' : 'arrow'} onClick={this.voteDown.bind(this)}>↓</span>
            <Badge
              badgeContent={this.props.downVoteCount}
              secondary
            />
          </div>
        </div>
      </div>
    );
  }
}
