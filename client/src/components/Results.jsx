import React from 'react';
import { connect } from 'react-redux';
import EmotionChart from './EmotionChart.jsx';
import ResultsHeading from './ResultsHeading.jsx';
import ResultsSummary from './ResultsSummary.jsx';
import ResultsVote from './ResultsVote.jsx';
import BubbleChartUpvotes from './BubbleChartUpvotes.jsx';
import { fetchArticles } from './../actions/dashboardActions.js';

// take analyzeText boolean from store.analyzer
// if analyzeText is true
// then do not show ResultsVote

@connect((store) => {
  return {
    analyzeText: store.analyzer.analyzeText,
    score: store.analyzer.score,
    sentiment: store.analyzer.sentiment,
    success: store.analyzer.success,
    summary: store.analyzer.summary,
    title: store.analyzer.title,
    visible: store.user.resultView, // keeps in store & in action function the routing
  };
}) export default class Results extends React.Component {

  componentDidUpdate () {
    this.props.dispatch(fetchArticles());
  }

  render() {
    // should handle unified conditional rendering throughout the app
    return this.props.visible && (
        <div className="padTop">
          <h2 className="center-text">Results</h2>
          <div className="container width500">
            <ResultsHeading
                  score={this.props.score}
                  polarity={this.props.sentiment.polarity}
            />
            { !this.props.analyzeText ? <ResultsVote /> : null }
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
