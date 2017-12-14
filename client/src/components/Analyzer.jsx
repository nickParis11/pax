import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import Login from './Login.jsx';
import Input from './Input.jsx';
import Waiting from './Waiting.jsx';
import Results from './Results.jsx';

@connect((store) => {
  return {
    loginView: store.user.loginView,
    success: store.analyzer.success,
    waiting: store.analyzer.waiting,
  };
}) export default class Analyzer extends React.Component {
  render() {
    if (this.props.loginView) {
      return (
        <div>
          <Nav />
          <h2>Log in</h2>
          <Login />
        </div>
      );
    }
    return (
      <div>
        <Nav />
        <h2>Analyzer</h2>
        <Input />
        {this.props.waiting ? <Waiting /> : null}
        {this.props.success ? <Results /> : null}
      </div>
    );
  }
}
