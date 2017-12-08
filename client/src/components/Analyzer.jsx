import React from 'react';
import { connect } from 'react-redux';
import { toggleUrlText } from '../actions/analyzerActions.js';

@connect((store) => {
  return {
    analyzeUrl: store.analyzer.analyzeUrl,
    analyzeText: store.analyzer.analyzeText,
  };
})

export default class Analyzer extends React.Component {

  clickHandle() {
    this.props.dispatch(toggleUrlText(this.props.analyzeUrl));
  }

  render() {
    console.log(this.props);
    if (this.props.analyzeUrl) {
      return (
        <div>
          <h2>Analyzer</h2>
          <input type='url' /><br />
          <button onClick={this.clickHandle.bind(this)}>Switch to Text</button>
          <button>Analyze</button>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Analyzer</h2>
          <textarea type='text' /><br />
          <button onClick={this.clickHandle.bind(this)}>Switch to URL</button>
          <button>Analyze</button>
        </div>
      )
    }

  }
}