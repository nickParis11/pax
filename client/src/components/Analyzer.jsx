import React from 'react';
import { connect } from 'react-redux';
import Input from './Input.jsx';
import Results from './Results.jsx';
import { toggleUrlText, getAnalysis } from '../actions/analyzerActions.js';

@connect((store) => {
  return {
    analysis: store.analyzer.analysis,
    analyzeUrl: store.analyzer.analyzeUrl,
    analyzeText: store.analyzer.analyzeText,
    error: store.analyzer.error,
    input: store.analyzer.input,
    success: store.analyzer.success,
  };
})

export default class Analyzer extends React.Component {

  render() {
    return (
      <div>
        <h2>Analyzer</h2>
        <Input />
        {this.props.success ? <Results /> : null}
      </div>
    )
  }
}