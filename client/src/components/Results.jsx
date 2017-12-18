import React from 'react';
import { connect } from 'react-redux';
import EmotionChart from './EmotionChart.jsx';
<<<<<<< HEAD
import ResultsHeading from './ResultsHeading.jsx';
import ResultsSummary from './ResultsSummary.jsx';
import ResultsVote from './ResultsVote.jsx';

@connect((store) => {
  return {
    score: store.analyzer.score,
    sentiment: store.analyzer.sentiment,
    success: store.analyzer.success,
  };
}) export default class Results extends React.Component {
=======
import { getArticleVoteData, vote } from '../actions/voteActions.js';

@connect((store) => {
  return {
    downVote: store.vote.downVote,
    downVoteCount: store.vote.downVoteCount,
    id: store.analyzer.id,
    score: store.analyzer.score,
    sentiment: store.analyzer.sentiment,
    success: store.analyzer.success,
    upVote: store.vote.upVote,
    upVoteCount: store.vote.upVoteCount,
    login: store.user.username,
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

  handleVote(e) {
    // if there is a user logged in
    if (this.props.login !== false) {
      if (e.target.innerText === '↑') {
        this.props.dispatch(vote(this.props.id, true));
      } else {
        this.props.dispatch(vote(this.props.id, false));
      }
    } else {
      alert("Please log in to enable voting");
    }
  }

  render() {
    return this.props.success && (
      <div>
        <ResultsHeading
          score={this.props.score}
        />
        <div className="row">
          <ResultsVote />
          <ResultsSummary
            polarity={this.props.sentiment.polarity}
          />
        </div>
        <EmotionChart />
      </div>
    );
  }
}
