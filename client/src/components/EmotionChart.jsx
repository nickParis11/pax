import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import { connect } from 'react-redux';

@connect(store => ({
  height: store.analyzer.height,
  sentiment: store.analyzer.sentiment,
  success: store.analyzer.success,
  tone: store.analyzer.tone,
  width: store.analyzer.width,
})) export default class EmotionChart extends React.Component {
  drawChart() {
    const div = new ReactFauxDOM.Element('div');
    const tone = this.props.tone.document_tone;
    const emotionList = tone.tone_categories[0].tones.map(emo =>
      [emo.tone_name, Math.round(emo.score * 100)]);
    const languageToneList = tone.tone_categories[1].tones.map(lang =>
      [lang.tone_name, Math.round(lang.score * 100)]);
    const socialToneList = tone.tone_categories[2].tones.map(soc =>
      [soc.tone_name, Math.round(soc.score * 100)]);
    const allTonesList = emotionList.concat(languageToneList, socialToneList);
    const data = allTonesList;
    const margin = {
      top: 45, right: 5, bottom: 100, left: 45,
    };
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;
    console.log('width', width);
    console.log('height', height);

    const y = d3
      .scaleLinear()
      .range([height, 0]);

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(10)
      .paddingOuter(25);

    const svg = d3
      .select(div)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // create range
    y.domain([0, 100]);
    x.domain(data.map(d => d[0]));

    svg.append('g')
      .call(d3.axisLeft(y));
    // create x-axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-2em')
      .attr('dy', '.15em')
      .style("font", "14px")
      .attr('transform', 'rotate(-65)');

    // x-axis text label
    svg.append('text')
      .style('text-anchor', 'middle')
      .attr('dx', '22em')
      .attr('dy', '-.5em')
      .text('Tone Type');

    // create y-axis


    // y-axis text label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', 0 - (height / 2))
      .attr('dy', '-2em')
      .attr('dx', '3em')
      .style('text-anchor', 'end')
      .text('Tone level (%)');

    // values for both axis
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d[0]))
      .attr('width', 20)
      .attr('y', d => y(d[1]))
      .attr('height', d => height - y(d[1]))
      .append('svg:title')
      .text((d) => { return `${d[0]} : ${d[1]}`; });
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
