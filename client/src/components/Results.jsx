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
    visible: store.user.resultView, // keeps in store & in action function the routing
  };
}) export default class Results extends React.Component {

  render() {
    // should handle unified conditional rendering throughout the app
    return this.props.visible && (
      <div>
        <ResultsHeading
          score={this.props.score}
        />
        <div className="row">
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

