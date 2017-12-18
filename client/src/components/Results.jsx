import React from 'react';
import { connect } from 'react-redux';
import EmotionChart from './EmotionChart.jsx';
import ResultsVote from './ResultsVote.jsx';

@connect((store) => {
  return {
    score: store.analyzer.score,
    sentiment: store.analyzer.sentiment,
    success: store.analyzer.success,
  };
}) export default class Results extends React.Component {

  render() {
    return this.props.success && (
      <div>
        <h1 className="componentTitle">RESULTS</h1>
        <h2 className="trustRating">Trust Rating: {this.props.score}%</h2>
        <div className="row">
          <ResultsVote />
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
