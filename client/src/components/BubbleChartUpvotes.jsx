import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

@connect((store) => {
  return {
    height: store.analyzer.height,
  };
}) export default class BubbleChartUpvotes extends React.Component {
  drawChart() {
    const div = new ReactFauxDOM.Element('div');
    const format = d3.format(',d');
    const color = d3.scaleOrdinal(d3.schemeCategory20c);
    const height = this.props.height;

    const bubble = d3.pack()
      .size([this.props.height, this.props.height])
      .padding(1.5);

    const svg = d3.select('body').append('svg')
          .attr('width', this.props.height)
          .attr('height', this.props.height)
          .attr('class', 'bubble');




  }

  render() {
    return (
      <div className="container">
        {this.drawChart()}
      </div>
    );
  }
}
