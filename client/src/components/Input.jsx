import React from 'react';
import { connect } from 'react-redux';
import { toggleUrlText, extractArticle, getAnalysis } from '../actions/analyzerActions.js';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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

    if (this.props.analyzeUrl){
      this.props.dispatch(extractArticle(value, (article) => {
        this.props.dispatch(getAnalysis(article));
      }));
    } else {
      this.props.dispatch(getAnalysis(value));
    }
  }

  render() {
    if (this.props.analyzeUrl) {
      return (
        <div>
          <RaisedButton label='Switch to Text' onClick={this.textToggleHandle.bind(this)} /><br />
          <TextField floatingLabelText='Enter URL here'  /><br />
          <RaisedButton label='Analyze' onClick={this.checkInput.bind(this)} />
        </div>
      )
    } else {
      return (
        <div>
          <RaisedButton label='Switch to URL' onClick={this.textToggleHandle.bind(this)} /><br />
          <textarea type='text' id='input' rows='20' cols='100'/><br />
          <RaisedButton label='Analyze' onClick={this.checkInput.bind(this)} />
        </div>
      )
    }
  }

}