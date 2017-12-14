import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import { connect } from 'react-redux';

@connect(store => ({
  height: store.analyzer.height,
  sentiment: store.analyzer.sentiment,
  tone: store.analyzer.tone,
  width: store.analyzer.width,
}))

export default class EmotionChart extends React.Component {

  drawChart() {
    const div = new ReactFauxDOM.Element('div');

    let tone = this.props.tone.document_tone;
    let sentiment = this.props.sentiment;
    // emotion list array in ['emotion type', score] format
    let emotionList = tone.tone_categories[0].tones.map(emo => [emo.tone_name, Math.round(emo.score * 100)]);

    let languageToneList = tone.tone_categories[1].tones.map(lang => [lang.tone_name, Math.round(lang.score * 100)]);

    let socialToneList = tone.tone_categories[2].tones.map(soc => [soc.tone_name, Math.round(soc.score * 100)]);

    let allTonesList = emotionList.concat(languageToneList, socialToneList);

    let toneNames = allTonesList.map(criteria => criteria[0]);

    let toneScores = allTonesList.map(criteria => criteria[1]);


    let data = allTonesList;

    const padding = 25;
    let margin = {
        top: 25, right: 25, bottom: 25, left: 25,
      },
      width = this.props.width - margin.left - margin.right,
      height = this.props.height - margin.top - margin.bottom;
      console.log('width', width);
      console.log('height', height);

    let x = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(5)
      .paddingOuter(5)

    let y = d3
        .scaleLinear()
        .range([height, 0])

    let xAxis = d3
      .axisBottom()
      .scale(x)

    let yAxis = d3
      .axisLeft()
      .scale(y)
      .ticks(10, '%');

    let svg = d3
      .select(div)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
 // /     .style('background-color', '#E5DF24')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

      x.domain(data.map((d) => d[0]));
      y.domain([0, /*d3.max(data, (d)=> d[1])*/100]);

      svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height}`)
      .call(xAxis);

      svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(90)')
      .attr('y',6)
      .attr('dy', '.65em')
      .style('text-anchor', 'end')
      .text('Frequency');

      svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d[0]))
        .attr('width',20)
        .attr('y', (d) => y(d[1]))
        .style('fill', '#800080')
        .attr('height', (d) => {return height - y(d[1])});
    return div.toReact()
  }




  render() {
    return this.drawChart();
  }
}
