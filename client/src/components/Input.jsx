import React from 'react';
import { connect } from 'react-redux';
import { toggleUrlText, getAnalysis } from '../actions/analyzerActions.js';

@connect((store) => {
  return {
    analyzeUrl: store.analyzer.analyzeUrl,
    analyzeText: store.analyzer.analyzeText,
    input: store.analyzer.input,
  };
})

export default class Input extends React.Component {

  textToggleHandle() {
    this.props.dispatch(toggleUrlText(this.props.analyzeUrl));
  }

  checkInput() {
    let value = document.getElementById('input').value;
    if (value === '') {
      alert('Please enter a url or text to analyze');
    } else {
      this.analyzeHandle();
    }
  }

  analyzeHandle() {
    let value = document.getElementById('input').value;
    this.props.dispatch(getAnalysis(value, this.props.analyzeUrl));
  }

  render() {
    if (this.props.analyzeUrl) {
      return (
        <div>
          <button onClick={this.textToggleHandle.bind(this)}>Switch to Text</button><br />
          <input type='text' id='input' width='200px'/><br />
          <input type='submit' onClick={this.checkInput.bind(this)} value='Analyze' />
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={this.textToggleHandle.bind(this)}>Switch to URL</button><br />
          <textarea type='text' id='input' rows='20' cols='100'/><br />
          <input type='submit' onClick={this.checkInput.bind(this)} value='Analyze' />
        </div>
      )
    }
  }

}