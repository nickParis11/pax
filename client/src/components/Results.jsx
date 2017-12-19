import React from 'react';
import { connect } from 'react-redux';
import EmotionChart from './EmotionChart.jsx';
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

