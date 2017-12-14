import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import Login from './Login.jsx';
import Input from './Input.jsx';
import Waiting from './Waiting.jsx';
import Results from './Results.jsx';
import { toggleUrlText, getAnalysis } from '../actions/analyzerActions.js';
import EmotionChart from './EmotionChart.jsx';

@connect((store) => {
  return {
    loginView: store.user.loginView,
    success: store.analyzer.success,
    waiting: store.analyzer.waiting,
  };
export default class Analyzer extends React.Component {
>>>>>>> merge conflict resolution
  render() {
    if (this.props.loginView) {
      return (
        <div>
          <Nav />
          <h2>Log in</h2>
          <Login />
        </div>
      );
    } else {
      return (
        <div>
          <Nav />
          <h2>Analyzer</h2>
          <Input />
          {this.props.waiting ? <Waiting /> : null}
          {this.props.success ? <Results /> : null}
          {this.props.success ? <EmotionChart /> : null}
        </div>
      )
    }
  }
}
