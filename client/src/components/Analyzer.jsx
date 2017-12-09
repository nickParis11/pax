import React from 'react';
import { connect } from 'react-redux';
import { toggleUrlText, getAnalyzation } from '../actions/analyzerActions.js';

@connect((store) => {
  return {
    analyzeUrl: store.analyzer.analyzeUrl,
    analyzeText: store.analyzer.analyzeText,
    input: store.analyzer.input,
  };
})

export default class Analyzer extends React.Component {

  textToggleHandle() {
    this.props.dispatch(toggleUrlText(this.props.analyzeUrl));
  }

  analyzeHandle() {
    let value = document.getElementById('input').value;
    this.props.dispatch(getAnalyzation(value));
  }

  render() {
    if (this.props.analyzeUrl) {
      return (
        <div>
          <h2>Analyzer</h2>
          <input type='text' id='input' /><br />
          <button onClick={this.textToggleHandle.bind(this)}>Switch to Text</button>
          <input type='submit' onClick={this.analyzeHandle.bind(this)} value='Analyze' />
        </div>
      )
    } else {
      return (
        <div>
          <h2>Analyzer</h2>
          <textarea type='text' id='input' /><br />
          <button onClick={this.textToggleHandle.bind(this)}>Switch to URL</button>
          <input type='submit' onClick={this.analyzeHandle.bind(this)} value='Analyze' />
        </div>
      )
    }
  }
}