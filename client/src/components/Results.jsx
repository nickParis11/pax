import React from 'react';
import { connect } from 'react-redux';
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
})

export default class Results extends React.Component {

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
    const tone = this.props.tone.document_tone;
    console.log(this.props);
    const sentiment = this.props.sentiment;

    return (
      <div>
        <h1 className="componentTitle">RESULTS</h1>
        <h2 className="trustRating">Trust Rating: {this.props.score}</h2>
        <div className="row">
          <div className="container">
            <div className="summaryContainer">
              <p><b>Summary: </b>
                <br/>
                Polarity: {sentiment.polarity}
              </p>
            </div>
            <div className="arrowContainer">
              <div className="arrowVoteContainer">
                <span className="arrow" onClick={this.voteUp.bind(this)}>↑</span>
                <span>0</span>
              </div>
              <div className="arrowVoteContainer">
                <span className="arrow" onClick={this.voteDown.bind(this)}>↓</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
