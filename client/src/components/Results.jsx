import React from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import EmotionChart from './EmotionChart.jsx';
import { downvote, getArticleVoteData, upvote } from '../actions/voteActions.js';

@connect((store) => {
  return {
    downVote: store.vote.downVote,
    downVoteCount: store.vote.downVoteCount,
    score: store.analyzer.score,
    sentiment: store.analyzer.sentiment,
    success: store.analyzer.success,
    upVote: store.vote.upVote,
    upVoteCount: store.vote.upVoteCount,
  };
}) export default class Results extends React.Component {
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
    return this.props.success && (
      <div>
        <h1 className="componentTitle">RESULTS</h1>
        <h2 className="trustRating">Trust Rating: {this.props.score}%</h2>
        <div className="row">
          <div className="arrows">
            <div className="arrowsContainer">
              <span
                role="button"
                tabindex='1'
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
                tabindex='2'
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
          <div />
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
        </div>
        {this.props.success && <EmotionChart />}
      </div>
    );
  }
}
