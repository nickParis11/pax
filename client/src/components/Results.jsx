import React from 'react';
import { connect } from 'react-redux';
import EmotionChart from './EmotionChart.jsx';
import ResultsHeading from './ResultsHeading.jsx';
import ResultsSummary from './ResultsSummary.jsx';
import ResultsVote from './ResultsVote.jsx';
import BubbleChartUpvotes from './BubbleChartUpvotes.jsx';


@connect((store) => {
  return {
    score: store.analyzer.score,
    sentiment: store.analyzer.sentiment,
    success: store.analyzer.success,
    summary: store.analyzer.summary,
    title: store.analyzer.title,
  };
}) export default class Results extends React.Component {
  render() {
    return this.props.success && (
      <div className="padTop">
        <h2 className="center-text">Results</h2>
        <div className="container width500">
          <ResultsHeading
            score={this.props.score}
            polarity={this.props.sentiment.polarity}
          />
          <ResultsVote />
        </div>

        <div className="row">
          <ResultsSummary
            summary={this.props.summary}
            title={this.props.title}
          />
        </div>
        <EmotionChart />
        <BubbleChartUpvotes />
      </div>
    );
  }
}

