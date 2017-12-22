import React from 'react';
import { connect } from 'react-redux';
import Nav from './Nav.jsx';
import Input from './Input.jsx';
import Waiting from './Waiting.jsx';
import Results from './Results.jsx';
import { getUserUpvoteAverages } from '../actions/userActions.js';

@connect((store) => {
  return {
    success: store.analyzer.success,
    waiting: store.analyzer.waiting,
    login: store.user.login,
    username: store.user.username,
  };
}) export default class Analyzer extends React.Component {

  componentWillUpdate() {
    // console.log('this.props.username', this.props.username);
    // console.log('getUserUpvoteAverages', getUserUpvoteAverages);
    // if (this.props.login !== false) {
    this.props.dispatch(getUserUpvoteAverages());
    // }
  }

  render() {
    console.log('this.props.username', this.props.username);
    return (
      <div>
        <Nav />
        <Input />
        <Waiting
          display={this.props.waiting}
        />
        <Results />
      </div>
    );
  }
}
