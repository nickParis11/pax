import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';
// import * as d3 from 'd3';

@connect((store) => {
  return {
    height: store.analyzer.height,
    sentiment: store.analyzer.sentiment,
    tone: store.analyzer.tone,
    width: store.analyzer.width,
  };
}) export default class BubbleChartUpvotes extends React.Component {
  drawChart() {
    const div = new ReactFauxDOM.Element('div');
    return div.toReact();
  }

  render() {
    return (
      <div className="container">
        {this.drawChart()}
      </div>
    );
  }
}
// articles I tend to agree = articles I upvote
