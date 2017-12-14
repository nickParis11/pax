import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import EmotionChart from './EmotionChart.jsx';

export default class Charts extends React.Components {
  render() {
    return (
      <div>
        <EmotionChart />
      </div>
    );
  }
}
