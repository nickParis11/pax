import React from 'react';
import { connect } from 'react-redux';
import { setUsername, setPassword } from '../actions/userActions.js';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

@connect((store) => {
  return {
    password: store.user.password,
    username: store.user.username,
  };
})

export default class Login extends React.Component {

  handleUserChange(e, i) {
    this.props.dispatch(setUsername(i));
  }

  handlePassChange(e, i) {
    this.props.dispatch(setPassword(i));
  }

  render() {
    return (
      <div>
        <TextField floatingLabelText='Username' onChange={this.handleUserChange.bind(this)} /><br />
        <TextField floatingLabelText='Password' onChange={this.handlePassChange.bind(this)} /><br />
        <RaisedButton label='Log In' />
      </div>
    )
  }
}