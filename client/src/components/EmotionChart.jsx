import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    height: store.analyzer.height,
    sentiment: store.analyzer.sentiment,
    tone: store.analyzer.tone,
    width: store.analyzer.width,
  };
})

export default class EmotionChart extends React.Component {
  render() {
    const div = new ReactFauxDOM.Element('div');

    let padding = 25;
    let margin = {top:25, right:25, bottom:25, left:25},
        width = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;

    var tooltip = d3
        .select('body')
        .append('div')
        .attr('class','tooltip')
        .style('opacity',0.5)

    let tone = this.props.tone.document_tone;
    let sentiment = this.props.sentiment;
    //emotion list array in ['emotion type', score] format
    let emotionList = tone.tone_categories[0].tones.map((emo) => {
      return [emo.tone_name, Math.round(emo.score*100)];
    })

    let languageToneList = tone.tone_categories[1].tones.map((lang) => {
      return [lang.tone_name, Math.round(lang.score*100)];
    })

    let socialToneList = tone.tone_categories[2].tones.map((soc) => {
      return [soc.tone_name, Math.round(soc.score*100)];
    })

    let allTonesList = emotionList.concat(languageToneList, socialToneList);

    let toneNames = allTonesList.map((criteria)=> {
      return criteria[0];
    })

    let toneScores = allTonesList.map((criteria)=> {
      return criteria[1];
    })

    console.log('toneNames', toneNames);
    console.log('toneScores', toneScores);

    let x = d3
        .scaleOrdinal([0, width]);

    let y = d3
        d3.scaleLinear([height, 0]);

    let xAxis = d3
        .axisBottom(x)
   //     .ticks(7);
// var xAxis = d3.svg.axis().scale(xRange).tickFormat(function(d) { return d.x;});
// var yAxis = d3.svg.axis().scale(yRange).orient("left");

// var xAxis = d3.axisBottom(xRange).tickFormat(function(d){ return d.x;});
// var yAxis = d3.axisLeft(yRange);

    let yAxis = d3.axisLeft().scale(y);

    //Pass it to d3.select and proceed as normal
    let svg = d3
        .select(div)
        .append('svg')
        .attr('width', this.props.width)
        .attr('height',this.props.height)
        .style('background-color','#E5DF24')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      svg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

      svg
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(90)')
        .attr('y', 4)
        .attr('dy', '.69em')
        .style('text-anchor','end')
        .text('Tone level (%)');

      function validLine(index, item) {
        if (toneScores[index + 1]) {
          return toneScores[index+1]
        } else {
          return null;
        }
      }

      toneScores.forEach( (score, index, array) => {
        svg
          .append('rect')
          .attr('class', 'scatter-bar')
          .attr('x', x(toneNames[index]))
          .attr('y', y(score))
          .attr('width', 15)
          .attr('height', height - y(score))
          .style('fill', '#F2E6F7');
      })
      return <div>{div.toReact()}</div>
  }
}