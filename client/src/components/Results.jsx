import React from 'react';
import { connect } from 'react-redux';
import EmotionChart from './EmotionChart.jsx';
import ResultsSummary from './ResultsSummary.jsx';
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
          <ResultsSummary
            polarity={this.props.sentiment.polarity}
          />
        </div>
        <EmotionChart />
      </div>
    );
  }
}
