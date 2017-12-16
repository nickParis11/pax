import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    score: store.analyzer.score,
    sentiment: store.analyzer.sentiment,
    tone: store.analyzer.tone,
  };
})

export default class Results extends React.Component {
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
                <span className="arrow">↑</span>
                <span>0</span>
              </div>
              <div className="arrowVoteContainer">
                <span className="arrow">↓</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
