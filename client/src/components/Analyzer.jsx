import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import Input from './Input.jsx';
import Waiting from './Waiting.jsx';
import Results from './Results.jsx';

@connect((store) => {
  return {
    success: store.analyzer.success,
    waiting: store.analyzer.waiting,
  };
})
export default class Analyzer extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        {!this.props.success && <Input />}
        {this.props.waiting && <Waiting />}
        <Results />
      </div>
    );
  }
}
