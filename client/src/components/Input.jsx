import React from 'react';
import { connect } from 'react-redux';
import { toggleUrlText, getUrlAnalysis, getTextAnalysis } from '../actions/analyzerActions';
import InputURL from './InputURL.jsx';
import InputText from './InputText.jsx';

@connect((store) => {
  return {
    analyzeUrl: store.analyzer.analyzeUrl,
    analyzeText: store.analyzer.analyzeText,
    input: store.analyzer.input,
  };
}) export default class Input extends React.Component {
  textToggleHandle() {
    this.props.dispatch(toggleUrlText(this.props.analyzeUrl));
  }

  checkInput() {
    const value = escape(document.getElementById('input').value);
    if (value === '') {
      alert('Please enter a URL or text to analyze.');
    } else {
      this.analyzeHandle();
    }
  }

  analyzeHandle() {
    const value = document.getElementById('input').value;
    if (this.props.analyzeUrl) {
      this.props.dispatch(getUrlAnalysis(value));
    } else {
      this.props.dispatch(getTextAnalysis(value));
    }
  }

  render() {
    return (
      <div className="container">
        <InputURL
          display={this.props.analyzeUrl}
          checkInput={this.checkInput.bind(this)}
          textToggleHandle={this.textToggleHandle.bind(this)}
        />
        <InputText
          display={this.props.analyzeUrl}
          checkInput={this.checkInput.bind(this)}
          textToggleHandle={this.textToggleHandle.bind(this)}
        />
      </div>
    );
  }
}
