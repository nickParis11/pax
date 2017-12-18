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
    // const sentiment = this.props.sentiment;
    // emotion list array in ['emotion type', score] format
    const emotionList = tone.tone_categories[0].tones.map(emo =>
      [emo.tone_name, Math.round(emo.score * 100)]);
    const languageToneList = tone.tone_categories[1].tones.map(lang =>
      [lang.tone_name, Math.round(lang.score * 100)]);
    const socialToneList = tone.tone_categories[2].tones.map(soc =>
      [soc.tone_name, Math.round(soc.score * 100)]);
    const allTonesList = emotionList.concat(languageToneList, socialToneList);
    const data = allTonesList;
    const margin = {
      top: 45, right: 5, bottom: 10, left: 45,
    };
    const width = this.props.width - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;
    console.log('width', width);
    console.log('height', height);
    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(10)
      .paddingOuter(25);
    const y = d3
      .scaleLinear()
      .range([height, 0]);

    // const valueline = d3.line()
    //   .data(data)
    //   .x( d => {return x(d[0])})
    //   .y( d => {return y(d[1])});

    // const xAxis = d3
    //   .axisBottom()
    //   .scale(x);

    // const yAxis = d3
    //   .axisLeft()
    //   .scale(y)
    //   .tickFormat(d3.format('10'));
    const svg = d3
      .select(div)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      //     .style('background-color', '#E5DF24')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    x.domain(data.map(d => d[0]));
    y.domain([0, /* d3.max(data, (d)=> d[1]) */100]);

    // create axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${-height}`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-2em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    // add text label
    svg.append('text')
      // .attr('transform', `translate(${width/2} ,${height + margin.top + 30}`)
      .style('text-anchor', 'middle')
      // .style('text-anchor', 'end')
      .attr('dx', '22em')
      .attr('dy', '-.5em')
      .text('Tone Type');

    svg.append('g')
      // .attr('class', 'y axis')
      .call(d3.axisLeft(y));

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', 0 - (height / 2))
      .attr('dy', '-2em')
      .style('text-anchor', 'end')
      .text('Tone level (%)');

    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d[0]))
      .attr('width', 20)
      .attr('y', d => y(d[1]))
//      .style('fill', '#800080')
      .attr('height', d => height - y(d[1]));

    // var selector = d3.select('#drop')
    // .append('select')
    // .attr('id','dropdown')
    // .on('change', function(d){
    //   selection = document.getElementById('dropdown');
    //   y.domain([0,d3.max(data, function(d) {
    //     return +d[1]
    //   })]);
    //   yAxis.scale(y);

    //   d3.selectAll('.bar')
    //     .transition()
    //     .attr('height', (d) => {
    //       return height - y(+d[1]);
    //     })
    //     .attr('x', (d, i )=> {
    //       return (width / data.length) * i
    //     })
    //     .attr('y', (d)=>{
    //       return y(+d[1]);
    //     })
    //     .ease('linear')
    //     .select('title')
    //     .text((d)=>{
    //       return d[0] + ':' + d[1];
    //     });

    //   d3.selectAll('g.y.axis')
    //     .transition()
    //     .call(yAxis);

    //   selector.selectAll("option")
    //   .data(elements)
    //   .enter().append("option")
    //   .attr("value", function(d){
    //     return d;
    //   })
    //   .text(function(d){
    //     return d;
    //   })
    // })


    return div.toReact();
  }

  render() {
    return this.props.success && (
      <div className="container">
        {this.drawChart()}
      </div>
    );
  }
}
