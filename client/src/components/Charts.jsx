import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import axios from 'axios';
import $ from 'jquery';
import EmotionChart from './EmotionChart.jsx';
// import SocialChart from './SocialChart.jsx';
// import ToneChart from './ToneChart.jsx';


export default class Charts extends React.Components {
  constructor(props) {
    super(props);

    this.state = {
      width: 500,
      height: 400
    }
  }

  componentWillMount() {
    var self = this;
  }

  render() {

  }
}