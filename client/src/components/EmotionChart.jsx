import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    sentiment: store.analyzer.sentiment,
    tone: store.analyzer.tone,
  };
})

export default class EmotionChart extends React.Component {
  constructor(props) {
    super(props);
  }

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
        .style('opacity',0)

    let tone = this.props.tone.document_tone;
    let sentiment = this.props.sentiment;
    //emotion list array in ['emotion type', score] format
    var emotionList = tone.tone_categories[0].tones.map((emo) => {
      return [emo.tone_name, Math.round(emo.score*100)];
    })

    var languageToneList = tone.tone_categories[1].tones.map((lang) => {
      return [lang.tone_name, Math.round(lang.score*100)];
    })

    var socialToneList = tone.tone_categories[2].tones.map((soc) => {
      return [soc.tone_name, Math.round(soc.score*100)];
    })

    var allTonesList = emotionList.concat(languageToneList, socialToneList);

    console.log('emotionNames', emotionNames);
    console.log('emotionScores', emotionScores);

    let x = d3
        .scaleLinear()
        .range([0, width]);

    let y = d3
        .scaleLinear()
        .range([0,height]);

    let xAxis = d3
        .axisBottom()
        .scale(x)
        .ticks(7);

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
        .text('Emotion level (%)');

      function validLine(index, item) {
        if (emotionScores[index + 1]) {
          return emotionScores[index+1]
        } else {
          return null;
        }
      }

      emotionScores.forEach( (score, index, array) => {
        svg
          .append('rect')
          .attr('class', 'scatter-bar')
          .attr('x', x(emotionNames[index]))
          .attr('y', y(score))
          .attr('width', 15)
          .attr('height', height - y(score))
          .style('fill', '#F2E6F7');
      })
      return <div>{div.toReact()}</div>
  }
}

export default EmotionChart;