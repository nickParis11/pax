import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

@connect((store) => {
  return {
    height: store.analyzer.height,
    tone: store.analyzer.tone,
    width: store.analyzer.width,
    upvoteAverages: store.user.upvoteAverages,
  };
}) export default class BubbleChartUpvotes extends React.Component {
  drawChart() {
    const div = new ReactFauxDOM.Element('div');
    const dataset = {};
    const tones = this.props.upvoteAverages;
    console.log('upvoteAverages', this.props.upvoteAverages);
    const allTonesList = Object.keys(tones).map((emo) => {
      return {
        Name: emo,
        Count: Math.round(tones[emo]),
      };
    });
    dataset.children = allTonesList;


    const color = d3.scaleOrdinal(d3.schemeCategory20);
    const diameter = this.props.height;
    const bubble = d3.pack(dataset)
      .size([diameter, diameter])
      .padding(1.5);

    const svg = d3.select(div)
      .append('svg')
      .attr('width', diameter)
      .attr('height', diameter)
      .attr('class', 'bubble');

    const nodes = d3.hierarchy(dataset)
      .sum((d) => { return d.Count; });

    const node = svg.selectAll('.node')
      .data(bubble(nodes).descendants())
      .enter()
      .filter((d) => { return !d.children; })
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => {
        return `translate( ${d.x}, ${d.y} )`;
      });

        node.append("title")
            .text(function(d) {
                return d.data.Name + ": " + d.data.Count;
            });

    node.append('circle')
      .attr('r', (d) => {
        return d.r;
      })
      .style('fill', (d, i) => {
        return color(i);
      });

    node.append('text')
      .attr('dy', '.2em')
      .style('text-anchor', 'middle')
      .text((d) => {
        return d.data.Name.substring(0, d.r / 3);
      })
      .attr('font-size', (d) => { return d.r / 5; })
      .attr('fill', 'white');

    node.append('text')
      .attr('dy', '1.3em')
      .style('text-anchor', 'middle')
      .text((d) => {
        return d.data.Count;
      })
      .attr('font-size', (d) => { return d.r / 5; })
      .attr('fill', 'white');

    d3.select(self.frameElement)
      .style('height', `${diameter}px`);
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
